import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripeSecretKey } from "@/lib/stripe-key";

type HerroepingBody = {
  naam?: unknown;
  email?: unknown;
  besteldatum?: unknown;
  aantalBesteld?: unknown;
  reikwijdte?: unknown;
  aantalHerroepen?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DUTCH_DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  timeZone: "Europe/Amsterdam",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function schoonTekst(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function datumInNederland(unixSeconds: number) {
  const parts = Object.fromEntries(
    DUTCH_DATE_FORMATTER.formatToParts(new Date(unixSeconds * 1000)).map(
      (part) => [part.type, part.value],
    ),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const ownOrigin = new URL(request.url).origin;
  if (origin && origin !== ownOrigin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let body: HerroepingBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  if (schoonTekst(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const naam = schoonTekst(body.naam, 100);
  const email = schoonTekst(body.email, 200).toLowerCase();
  const besteldatum = schoonTekst(body.besteldatum, 10);
  const aantalBesteld = Number.parseInt(schoonTekst(body.aantalBesteld, 4), 10);
  const reikwijdte = body.reikwijdte === "gedeeltelijk" ? "gedeeltelijk" : "volledig";
  const aantalHerroepen = reikwijdte === "gedeeltelijk"
    ? Number.parseInt(schoonTekst(body.aantalHerroepen, 4), 10)
    : aantalBesteld;

  if (
    !naam ||
    !EMAIL_PATTERN.test(email) ||
    !DATE_PATTERN.test(besteldatum) ||
    !Number.isInteger(aantalBesteld) ||
    aantalBesteld < 1 ||
    aantalBesteld > 150 ||
    !Number.isInteger(aantalHerroepen) ||
    aantalHerroepen < 1 ||
    aantalHerroepen > aantalBesteld
  ) {
    return NextResponse.json(
      { error: "Controleer je naam, e-mailadres, besteldatum en aantal sets." },
      { status: 400 },
    );
  }

  const key = stripeSecretKey();
  if (!key) {
    return NextResponse.json(
      { error: "De herroepingsfunctie is tijdelijk niet beschikbaar. Mail max@aimetmax.nl." },
      { status: 503 },
    );
  }

  try {
    const stripe = new Stripe(key);
    let gevonden: Stripe.Checkout.Session | undefined;
    let startingAfter: string | undefined;

    for (let pagina = 0; pagina < 10 && !gevonden; pagina++) {
      const resultaat = await stripe.checkout.sessions.list({
        limit: 100,
        status: "complete",
        starting_after: startingAfter,
      });

      gevonden = resultaat.data.find((session) => {
        const sessionEmail = (
          session.customer_details?.email ?? session.customer_email ?? ""
        ).toLowerCase();
        const sessionAantal = Number.parseInt(
          session.metadata?.aantal_sets ?? "",
          10,
        );
        return (
          session.metadata?.product === "ai-gesprekskaarten" &&
          session.payment_status === "paid" &&
          sessionEmail === email &&
          sessionAantal === aantalBesteld &&
          datumInNederland(session.created) === besteldatum
        );
      });

      if (!resultaat.has_more) break;
      startingAfter = resultaat.data.at(-1)?.id;
    }

    if (!gevonden) {
      return NextResponse.json(
        {
          error:
            "Ik kon geen betaalde bestelling vinden met deze combinatie. Controleer het e-mailadres, de besteldatum en het aantal sets uit je bestelbevestiging.",
        },
        { status: 404 },
      );
    }

    const ontvangenOp = new Date().toISOString();
    const referentie = `HR-${gevonden.id.slice(-10).toUpperCase()}`;
    await stripe.checkout.sessions.update(gevonden.id, {
      metadata: {
        ...(gevonden.metadata ?? {}),
        herroeping_status: "aangevraagd",
        herroeping_aangevraagd_op: ontvangenOp,
        herroeping_naam: naam,
        herroeping_reikwijdte: reikwijdte,
        herroeping_aantal_sets: String(aantalHerroepen),
        herroeping_referentie: referentie,
      },
    });

    const bevestiging = [
      "BEVESTIGING ONTVANGST HERROEPING",
      "",
      `Referentie: ${referentie}`,
      `Ontvangen op: ${ontvangenOp}`,
      `Naam: ${naam}`,
      `E-mailadres: ${email}`,
      `Besteldatum: ${besteldatum}`,
      `Oorspronkelijk aantal sets: ${aantalBesteld}`,
      `Herroepen aantal sets: ${aantalHerroepen}`,
      `Herroeping: ${reikwijdte}`,
      "",
      "AI met Max (Max Impact) heeft deze verklaring elektronisch ontvangen.",
      "Je ontvangt van Max de praktische retourinstructies.",
    ].join("\n");

    return NextResponse.json({ ok: true, referentie, ontvangenOp, bevestiging });
  } catch (error) {
    console.error(
      "herroepen: verwerken bij Stripe mislukt",
      error instanceof Error ? error.message : "onbekende fout",
    );
    return NextResponse.json(
      { error: "Verwerken lukt nu even niet. Mail max@aimetmax.nl." },
      { status: 503 },
    );
  }
}
