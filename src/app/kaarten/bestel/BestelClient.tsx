"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BESTEL,
  berekenBestelling,
  normaliseerAantal,
} from "../bestel-config";

const prijsFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: BESTEL.valuta,
});

function prijsTekst(bedrag: number) {
  return prijsFormatter.format(bedrag);
}

function setsTekst(aantal: number) {
  return `${aantal} set${aantal === 1 ? "" : "s"}`;
}

const fotos = [
  { src: "/kaarten/fotos/kaarten-in-de-hand.jpeg", alt: "Praten over AI: gesprekskaarten in de hand, met het open doosje op tafel", label: "Kaarten in de hand", width: 1756, height: 2048 },
  { src: "/kaarten/fotos/open-doosje.jpeg", alt: "Het open doosje Praten over AI met regelboekje en een waaier gesprekskaarten", label: "Doosje en inhoud", width: 1536, height: 2048 },
  { src: "/kaarten/fotos/doosjes.jpeg", alt: "De fysieke doosjes Praten over AI, met de voorkant en zijkant zichtbaar", label: "Het doosje", width: 2048, height: 1824 },
] as const;

export function BestelClient({
  stripeReady,
  voorraad,
}: {
  stripeReady: boolean;
  voorraad: number | null;
}) {
  const [aantal, setAantal] = useState<number>(BESTEL.standaardAantal);
  const [aantalInvoer, setAantalInvoer] = useState<string>(String(BESTEL.standaardAantal));
  const [status, setStatus] = useState("");
  const [bezig, setBezig] = useState(false);
  const [fotoIndex, setFotoIndex] = useState(0);
  const foto = fotos[fotoIndex];

  const effectiefMax =
    voorraad !== null ? Math.max(1, Math.min(BESTEL.maxOnlineAantal, voorraad)) : BESTEL.maxOnlineAantal;
  const uitverkocht = voorraad !== null && voorraad <= 0;

  const bestelling = berekenBestelling(aantal);
  const mode: "stripe" | "reserve" = stripeReady ? "stripe" : "reserve";

  function wijzigAantal(next: unknown) {
    const genormaliseerd = Math.min(normaliseerAantal(next), effectiefMax);
    setAantal(genormaliseerd);
    setAantalInvoer(next === "" ? "" : String(genormaliseerd));
    setStatus("");
  }

  async function checkout() {
    setBezig(true);
    setStatus("Je wordt doorgestuurd naar de beveiligde betaalpagina...");
    try {
      const r = await fetch("/api/kaarten-checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ aantal: bestelling.aantal }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.assign(d.url);
        return;
      }
      setStatus(
        "Online betalen lukt nu even niet. Mail me op max@aimetmax.nl, dan regel ik het.",
      );
    } catch {
      setStatus(
        "Online betalen lukt nu even niet. Mail me op max@aimetmax.nl, dan regel ik het.",
      );
    }
    setBezig(false);
  }

  async function reserveer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const email = String(data.get("email") || "").trim();
    if (!email) return;

    const fd = new FormData();
    fd.append("fields[email]", email);
    fd.append(
      "fields[leerwens]",
      [
        `Bestelling ${BESTEL.naam}: ${setsTekst(bestelling.aantal)}`,
        ...(bestelling.gratisSets > 0
          ? [
              `Actie: betaalt voor ${setsTekst(bestelling.betaaldeSets)}`,
              `Gratis sets: ${bestelling.gratisSets}`,
            ]
          : []),
      ].join(" | "),
    );
    fd.append("ml-submit", "1");
    fd.append("anticsrf", "true");
    setStatus("Versturen...");
    try {
      const r = await fetch(
        "https://assets.mailerlite.com/jsonp/955238/forms/190102348162401531/subscribe",
        { method: "POST", body: fd },
      );
      setStatus(
        r.ok
          ? "Gelukt. Je staat op de lijst; ik stuur je een betaallink of factuur zodra ik je bestelling verwerk. Check je inbox om te bevestigen."
          : "Dat ging mis. Mail me gerust direct op max@aimetmax.nl.",
      );
      if (r.ok) form.reset();
    } catch {
      setStatus("Dat ging mis. Mail me gerust direct op max@aimetmax.nl.");
    }
  }

  const factuurMail = {
    subject: `Bestelling op factuur - ${BESTEL.naam}`,
    body: [
      "Hoi Max,",
      "",
      `Ik bestel de ${BESTEL.naam} graag op factuur.`,
      "",
      `Aantal sets: ${bestelling.aantal}`,
      ...(bestelling.gratisSets > 0
        ? [
            `Actie: betaalt voor ${bestelling.betaaldeSets} set(s), ${bestelling.gratisSets} gratis`,
          ]
        : []),
      `Totaal indicatief incl. btw: ${prijsTekst(bestelling.totaal)}`,
      "",
      "- Organisatie: ",
      "- Contactpersoon: ",
      "- Factuuradres: ",
      "- E-mail voor de factuur: ",
      "- Inkoopordernummer (PO), indien van toepassing: ",
      "- Afleveradres (indien anders dan factuuradres): ",
      "",
      "Groet,",
    ].join("\n"),
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-7 sm:px-6 sm:py-10">
      <Link href="/kaarten" className="text-sm text-ink-soft underline-offset-4 hover:underline">
        &larr; Bekijk de online kaarten
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-x-14 lg:gap-y-0">
        <div className="lg:col-start-2 lg:row-start-1">
          <h1 className="hand text-4xl leading-tight text-ink sm:text-5xl">
            {BESTEL.naam}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
            54 gesprekskaarten om te ontdekken hoe jouw team écht denkt over AI.
            Pak een kaart en begin het gesprek.
          </p>
          <p className="mt-2 hidden text-sm text-ink-soft lg:block">
            Voor je teamoverleg, workshop of studiedag. Geen AI-kennis nodig.
          </p>
        </div>

        <div className="min-w-0 lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <div id="productfoto" className="overflow-hidden rounded-2xl bg-line/40">
            <Image
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              width={foto.width}
              height={foto.height}
              sizes="(max-width: 1023px) 100vw, 540px"
              className={`h-60 w-full object-contain sm:h-[420px] lg:h-[560px] ${fotoIndex === 1 ? "-rotate-90 scale-95" : ""}`}
              priority={fotoIndex === 0}
            />
          </div>
          <div className="mt-3 flex gap-3" role="group" aria-label="Productfoto's">
            {fotos.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setFotoIndex(index)}
                aria-label={item.label}
                aria-pressed={fotoIndex === index}
                aria-controls="productfoto"
                className={`overflow-hidden rounded-lg border-2 p-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${fotoIndex === index ? "border-accent" : "border-transparent hover:border-ink-soft"}`}
              >
                <Image src={item.src} alt="" width={72} height={72} sizes="72px" className={`h-12 w-12 rounded object-cover sm:h-[72px] sm:w-[72px] ${index === 1 ? "-rotate-90" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:pt-6">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p className="text-3xl font-bold text-ink">{prijsTekst(BESTEL.prijs)}</p>
            <span className="text-sm text-ink-soft">per set</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">
            Inclusief btw en gratis verzending in {BESTEL.verzendregio}.
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {uitverkocht ? "Tijdelijk uitverkocht." : BESTEL.preorder ? "Pre-order" : BESTEL.levertijd}
          </p>

          {BESTEL.preorder && BESTEL.preorderAanbod.actief && (
            <p className="mt-4 text-sm font-semibold text-ink">
              {BESTEL.preorderAanbod.titel}. {BESTEL.preorderAanbod.uitleg}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <label htmlFor="aantal" className="text-sm font-semibold text-ink">Aantal sets</label>
            <input
              id="aantal"
              type="number"
              min={1}
              max={effectiefMax}
              step={1}
              value={aantalInvoer}
              onChange={(e) => wijzigAantal(e.target.value)}
              onBlur={() => setAantalInvoer(String(bestelling.aantal))}
              disabled={uitverkocht || bezig}
              className="w-24 rounded-lg border border-ink-soft bg-card px-3 py-2.5 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
            />
          </div>
          {bestelling.aantal > 1 && (
            <div className="mt-3 text-sm text-ink" aria-live="polite">
              <p className="flex justify-between gap-3 font-semibold">
                <span>Totaal voor {setsTekst(bestelling.aantal)}</span>
                <span>{prijsTekst(bestelling.totaal)}</span>
              </p>
              {bestelling.bulkStaffel && (
                <p className="mt-1 text-ink-soft">
                  {Math.round(bestelling.kortingPercentage * 100)}% staffelkorting verrekend.
                </p>
              )}
              {bestelling.gratisSets > 0 && (
                <p className="mt-1 text-ink-soft">{bestelling.gratisSets} set(s) gratis via de actie.</p>
              )}
            </div>
          )}

          {uitverkocht ? (
            <p className="mt-5 text-sm text-ink-soft">
              Mail <a href="mailto:max@aimetmax.nl" className="underline">max@aimetmax.nl</a> voor de mogelijkheden.
            </p>
          ) : mode === "reserve" ? (
            <form onSubmit={reserveer} className="mt-5">
              <p className="text-sm text-ink-soft">
                Laat je e-mailadres achter, dan stuur ik je een betaallink of factuur.
              </p>
              <label htmlFor="bestel-email" className="mt-3 block text-sm font-medium">E-mailadres</label>
              <input id="bestel-email" type="email" name="email" required autoComplete="email" className="mt-1 w-full rounded-lg border border-ink-soft bg-card px-3 py-3 focus-visible:outline-2 focus-visible:outline-accent" />
              <button type="submit" className="btn btn-primary mt-3 w-full">Vraag een betaallink aan</button>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
            </form>
          ) : (
            <div className="mt-5">
              <button
                onClick={checkout}
                disabled={bezig}
                className="btn btn-primary w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70"
              >
                {bezig ? "Naar betalen..." : `Bestel ${setsTekst(bestelling.aantal)}`}
              </button>
              <p className="mt-3 text-center text-xs text-ink-soft">
                Veilig betalen. Je verzendadres vul je in bij het afrekenen.
              </p>
            </div>
          )}
          <p role="status" aria-live="polite" className={status ? "mt-3 text-sm font-semibold text-ink" : "sr-only"}>{status}</p>

          <p className="mt-4 text-center text-sm text-ink-soft">
            Liever <a
              href={"mailto:max@aimetmax.nl?subject=" + encodeURIComponent(factuurMail.subject) + "&body=" + encodeURIComponent(factuurMail.body)}
              className="font-medium text-ink underline underline-offset-4"
            >op factuur bestellen</a>?
          </p>

          <div className="mt-7 divide-y divide-line border-y border-line">
            <details className="py-4">
              <summary className="cursor-pointer text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent">Wat zit er in de doos?</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
                {BESTEL.inhoud.map((regel) => <li key={regel}>{regel}</li>)}
              </ul>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-accent">Meer sets voor je organisatie?</summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                5% korting vanaf 10 sets, 10% vanaf 30 sets en 20% vanaf 100 sets.
                De korting wordt automatisch verrekend. Voor een offerte of inkoopordernummer kun je op factuur bestellen.
              </p>
            </details>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            Eerst een kaart bekijken? <Link href="/kaarten#deck" className="underline underline-offset-4">Bekijk de gratis online set</Link>.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft">
            Door te bestellen ga je akkoord met de <Link href="/voorwaarden" className="underline">voorwaarden</Link> en het <Link href="/retour" className="underline">retourbeleid</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
