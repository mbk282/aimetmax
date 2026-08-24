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

function presetLabel(aantal: number) {
  if (aantal === 1) return "los";
  if (aantal === 2) return "cadeau";
  if (aantal === 10) return "team";
  if (aantal === 30) return "organisatie";
  if (aantal === 100) return "event";
  return "sets";
}

export function BestelClient({
  stripeReady,
  voorraad,
}: {
  stripeReady: boolean;
  voorraad: number | null;
}) {
  const [aantal, setAantal] = useState<number>(BESTEL.standaardAantal);
  const [status, setStatus] = useState("");
  const [bezig, setBezig] = useState(false);

  const effectiefMax =
    voorraad !== null ? Math.max(1, Math.min(BESTEL.maxOnlineAantal, voorraad)) : BESTEL.maxOnlineAantal;
  const uitverkocht = voorraad !== null && voorraad <= 0;

  const bestelling = berekenBestelling(aantal);
  const mode: "stripe" | "reserve" = stripeReady ? "stripe" : "reserve";

  function wijzigAantal(next: unknown) {
    setAantal(Math.min(normaliseerAantal(next), effectiefMax));
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
        `Bestelling AI-gesprekskaarten: ${setsTekst(bestelling.aantal)}`,
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
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/kaarten"
        className="text-sm font-medium text-ink-soft hover:text-accent"
      >
        &larr; Terug naar de kaarten
      </Link>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)]">
        <div className="space-y-4">
          <div className="warm-card grid grid-cols-2 gap-4 overflow-hidden bg-card p-4 sm:p-5">
            <figure>
              <Image
                src="/kaarten/doosje-3d-voorkant.png"
                alt="3D-productvisualisatie van de voorkant van het doosje met AI-gesprekskaarten"
                width={1254}
                height={1254}
                sizes="(max-width: 1023px) 42vw, 240px"
                className="mx-auto h-auto w-full rounded-xl"
                priority
              />
              <figcaption className="mt-2 text-center text-xs font-semibold text-ink-soft">
                Voorkant doosje
              </figcaption>
            </figure>
            <figure>
              <Image
                src="/kaarten/doosje-3d-achterkant.png"
                alt="3D-productvisualisatie van de achterkant van het doosje met AI-gesprekskaarten"
                width={1254}
                height={1254}
                sizes="(max-width: 1023px) 42vw, 240px"
                className="mx-auto h-auto w-full rounded-xl"
                priority
              />
              <figcaption className="mt-2 text-center text-xs font-semibold text-ink-soft">
                Achterkant doosje
              </figcaption>
            </figure>
          </div>
          <div className="warm-card bg-paper p-4">
            <Image
              src="/preview/kaart-voorkant.png"
              alt="Voorbeeld van een AI-gesprekskaart uit de set"
              width={500}
              height={700}
              sizes="(max-width: 1023px) 90vw, 480px"
              className="mx-auto h-48 w-full object-contain sm:h-56"
              priority
            />
            <p className="mt-2 text-center text-xs font-semibold text-ink-soft">
              Een kaart uit de set
            </p>
          </div>
        </div>

        <div>
          {BESTEL.preorder ? (
            <span className="inline-block rounded-full border-2 border-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Pre-order
            </span>
          ) : uitverkocht ? (
            <span className="inline-block rounded-full border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink">
              Uitverkocht
            </span>
          ) : (
            <span className="inline-block rounded-full border-2 border-sage px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-sage">
              Op voorraad
              {voorraad !== null ? ` · nog ${voorraad}` : ""}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {BESTEL.naam}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">
            {BESTEL.ondertitel}. Een complete, direct inzetbare teamsessie met 54
            gesprekskaarten, 6 spelregelkaarten, 4 jokers en een facilitator-note
            op elke kaart. Geen voorbereiding of AI-expertise nodig.
          </p>

          {BESTEL.preorderAanbod.actief && (
            <div className="mt-6 rounded-xl border-2 border-ink bg-hl p-5 shadow-[4px_4px_0_#2a2a2a]">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
                {BESTEL.preorderAanbod.label}
              </p>
              <h2 className="hand mt-1 text-3xl font-bold text-ink">
                {BESTEL.preorderAanbod.titel}
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                {BESTEL.preorderAanbod.uitleg} Het aanbod loopt door bij
                grotere aantallen: bij 10 sets betaal je voor 5, bij 100 sets
                betaal je voor 50.
              </p>
            </div>
          )}

          <div className="warm-card mt-7 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-ink-soft">
                  Jouw bestelling
                </p>
                <p className="mt-1 text-3xl font-bold text-ink">
                  {setsTekst(bestelling.aantal)} voor{" "}
                  {prijsTekst(bestelling.totaal)}
                </p>
                {bestelling.korting > 0 ? (
                  <div className="mt-1 text-sm text-ink-soft">
                    <p>
                      Normaal {prijsTekst(bestelling.normalePrijs)}, je voordeel{" "}
                      {prijsTekst(bestelling.korting)}
                    </p>
                    {bestelling.bulkStaffel ? (
                      <p className="font-semibold text-sage">
                        {bestelling.bulkStaffel.label}: {Math.round(bestelling.kortingPercentage * 100)}% staffelkorting
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="rounded-xl border-2 border-line bg-paper px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
                  Per set
                </p>
                <p className="text-xl font-bold text-ink">
                  {prijsTekst(bestelling.prijsPerSet)}
                </p>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-bold text-ink">Aantal sets</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {BESTEL.aantalKeuzes.map((n) => {
                  const actief = bestelling.aantal === n;
                  const beschikbaar = n <= effectiefMax;
                  return (
                    <button
                      type="button"
                      key={n}
                      disabled={!beschikbaar}
                      onClick={() => wijzigAantal(n)}
                      className={`rounded-xl border-2 px-3 py-2 text-left transition ${
                        !beschikbaar
                          ? "cursor-not-allowed border-line bg-card text-ink-soft/50"
                          : actief
                            ? "border-ink bg-accent text-white shadow-[3px_3px_0_#2a2a2a]"
                            : "border-line bg-card text-ink hover:border-accent"
                      }`}
                    >
                      <span className="block text-lg font-bold">{n}</span>
                      <span
                        className={`block text-xs ${
                          actief ? "text-white/85" : "text-ink-soft"
                        }`}
                      >
                        {presetLabel(n)}
                      </span>
                    </button>
                  );
                })}
              </div>
              <label
                htmlFor="aantal"
                className="mt-3 flex flex-wrap items-center gap-3 text-sm font-medium text-ink"
              >
                Eigen aantal
                <input
                  id="aantal"
                  type="number"
                  min={1}
                  max={effectiefMax}
                  step={1}
                  value={bestelling.aantal}
                  onChange={(e) => wijzigAantal(e.target.value)}
                  disabled={uitverkocht}
                  className="w-32 rounded-xl border-2 border-ink bg-card px-3 py-2 text-ink outline-none focus:ring-4 focus:ring-hl disabled:opacity-50"
                />
                <span className="text-ink-soft">
                  Online tot {effectiefMax} sets.
                </span>
              </label>
              <p className="mt-3 text-xs text-ink-soft">
                Staffelkorting voor organisaties: 5% vanaf 10 sets, 10% vanaf
                30 sets en 20% vanaf 100 sets. De korting wordt automatisch
                verwerkt.
              </p>
            </fieldset>

            {uitverkocht ? (
              <div className="mt-6 rounded-xl border-2 border-line bg-card p-4">
                <p className="text-sm font-semibold text-ink">
                  Online uitverkocht.
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Wil je toch een set (of meer), bijvoorbeeld voor een
                  organisatie of grotere afname? Mail me, dan kijk ik wat er
                  mogelijk is.
                </p>
              </div>
            ) : mode === "reserve" ? (
              <form onSubmit={reserveer} className="mt-6">
                <p className="text-sm text-ink-soft">
                  Online betalen staat hier nog niet aan. Laat je e-mailadres
                  achter, dan stuur ik je zelf een betaallink of factuur voor
                  jouw bestelling.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Je e-mailadres"
                    aria-label="Je e-mailadres"
                    autoComplete="email"
                    className="min-w-[220px] flex-1 rounded-xl border-2 border-ink bg-card px-4 py-3 text-ink outline-none focus:ring-4 focus:ring-hl"
                  />
                  <button type="submit" className="btn btn-primary">
                    Vraag een betaallink aan
                  </button>
                </div>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />
              </form>
            ) : (
              <div className="mt-6">
                <button
                  onClick={checkout}
                  disabled={bezig}
                  className="btn btn-primary disabled:cursor-wait disabled:opacity-70"
                >
                  {bezig
                    ? "Naar betalen..."
                    : `Bestel en betaal ${setsTekst(bestelling.aantal)}`}
                </button>
                <p className="mt-3 text-xs text-ink-soft">
                  Veilig betalen via een beveiligde betaalpagina. Je vult daar
                  ook je verzendadres in. {BESTEL.levertijd}
                </p>
              </div>
            )}

            {status ? (
              <p className="mt-3 text-sm font-semibold text-sage">{status}</p>
            ) : null}

            <p className="mt-4 text-xs text-ink-soft">
              Prijzen zijn inclusief btw en gratis verzending in{" "}
              {BESTEL.verzendregio}. Door te bestellen ga je akkoord met de{" "}
              <Link href="/voorwaarden" className="font-semibold underline">
                voorwaarden
              </Link>{" "}
              en het{" "}
              <Link href="/retour" className="font-semibold underline">
                retourbeleid
              </Link>
              .
            </p>
          </div>

          <div className="mt-6 rounded-xl border-2 border-line bg-card p-4">
            <p className="text-sm font-semibold text-ink">
              Liever op factuur bestellen?
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Voor organisaties, overheid, PO-nummers of aantallen boven{" "}
              {effectiefMax}: stuur je gegevens, dan ontvang je een factuur of
              offerte.
            </p>
            <a
              href={
                "mailto:max@aimetmax.nl?subject=" +
                encodeURIComponent(factuurMail.subject) +
                "&body=" +
                encodeURIComponent(factuurMail.body)
              }
              className="btn btn-ghost mt-3"
            >
              Bestel op factuur
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-[1fr_0.8fr]">
        <div className="warm-card bg-sage-soft p-6 sm:p-8">
          <h2 className="hand text-2xl font-bold text-ink">
            Wat zit er in de doos?
          </h2>
          <ul className="mt-4 space-y-2">
            {BESTEL.inhoud.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-ink">
                <span className="font-bold text-sage">&#10003;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="warm-card bg-accent-soft p-6 sm:p-8">
          <h2 className="hand text-2xl font-bold text-ink">
            Eerst proberen?
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            De hele set staat gratis online. Gebruik hem direct in een sessie,
            of print de gratis versie thuis.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/kaarten" className="btn btn-primary">
              Online gebruiken
            </Link>
            <Link href="/kaarten/print" className="btn btn-ghost">
              Printversie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
