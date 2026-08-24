"use client";

import { useState } from "react";

type Bevestiging = {
  referentie: string;
  ontvangenOp: string;
  bevestiging: string;
};

export function HerroepClient() {
  const [reikwijdte, setReikwijdte] = useState("volledig");
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");
  const [klaar, setKlaar] = useState<Bevestiging | null>(null);

  async function verstuur(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBezig(true);
    setFout("");
    setKlaar(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/herroepen", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        setFout(result.error || "Versturen is niet gelukt.");
      } else {
        setKlaar(result);
        form.reset();
        setReikwijdte("volledig");
      }
    } catch {
      setFout("Versturen lukt nu even niet. Mail max@aimetmax.nl.");
    } finally {
      setBezig(false);
    }
  }

  if (klaar) {
    const download = `data:text/plain;charset=utf-8,${encodeURIComponent(klaar.bevestiging)}`;
    return (
      <div className="warm-card mt-8 bg-sage-soft p-6 sm:p-8" role="status">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-sage">
          Ontvangen
        </p>
        <h2 className="hand mt-2 text-3xl font-bold text-ink">
          Je herroeping is ingediend
        </h2>
        <p className="mt-3 text-ink-soft">
          Referentie <strong className="text-ink">{klaar.referentie}</strong>.
          Bewaar de bevestiging hieronder. Je ontvangt van Max de praktische
          retourinstructies.
        </p>
        <a
          href={download}
          download={`bevestiging-${klaar.referentie}.txt`}
          className="btn btn-primary mt-5"
        >
          Download bevestiging
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={verstuur} className="warm-card mt-8 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-ink">
          Naam
          <input
            name="naam"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-xl border-2 border-ink bg-card px-4 py-3 font-normal outline-none focus:ring-4 focus:ring-hl"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          E-mailadres van de bestelling
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-xl border-2 border-ink bg-card px-4 py-3 font-normal outline-none focus:ring-4 focus:ring-hl"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Besteldatum
          <input
            name="besteldatum"
            type="date"
            required
            className="mt-2 w-full rounded-xl border-2 border-ink bg-card px-4 py-3 font-normal outline-none focus:ring-4 focus:ring-hl"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Aantal bestelde sets
          <input
            name="aantalBesteld"
            type="number"
            min={1}
            max={150}
            required
            className="mt-2 w-full rounded-xl border-2 border-ink bg-card px-4 py-3 font-normal outline-none focus:ring-4 focus:ring-hl"
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Wat wil je herroepen?
          <select
            name="reikwijdte"
            value={reikwijdte}
            onChange={(event) => setReikwijdte(event.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-ink bg-card px-4 py-3 font-normal outline-none focus:ring-4 focus:ring-hl"
          >
            <option value="volledig">De hele bestelling</option>
            <option value="gedeeltelijk">Een deel van de bestelling</option>
          </select>
        </label>
        {reikwijdte === "gedeeltelijk" ? (
          <label className="text-sm font-bold text-ink">
            Aantal sets dat je herroept
            <input
              name="aantalHerroepen"
              type="number"
              min={1}
              max={150}
              required
              className="mt-2 w-full rounded-xl border-2 border-ink bg-card px-4 py-3 font-normal outline-none focus:ring-4 focus:ring-hl"
            />
          </label>
        ) : null}
      </div>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <p className="mt-5 text-sm text-ink-soft">
        Je hoeft geen reden op te geven. Met de knop hieronder dien je de
        herroeping elektronisch in en bevestig je dat je deze overeenkomst wilt
        ontbinden.
      </p>
      <button
        type="submit"
        disabled={bezig}
        className="btn btn-primary mt-5 disabled:cursor-wait disabled:opacity-60"
      >
        {bezig ? "Herroeping indienen…" : "Herroeping bevestigen"}
      </button>
      {fout ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border-2 border-accent bg-accent-soft p-4 text-sm text-ink"
        >
          {fout}
        </p>
      ) : null}
    </form>
  );
}
