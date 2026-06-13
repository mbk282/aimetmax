"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BESTEL } from "../bestel-config";

const prijsTekst = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: BESTEL.valuta,
}).format(BESTEL.prijs);

export default function BestelPage() {
  const [aantal, setAantal] = useState(1);
  const [status, setStatus] = useState("");
  const heeftBetaling = BESTEL.betaalLink.trim().length > 0;

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
      `Pre-order AI-gesprekskaarten: ${aantal} set(s)`,
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
          ? "Gelukt. Je staat op de lijst en hoort als eerste wanneer de set er is. Check je inbox om je aanmelding te bevestigen."
          : "Dat ging mis. Mail me gerust direct op max@aimetmax.nl.",
      );
      if (r.ok) form.reset();
    } catch {
      setStatus("Dat ging mis. Mail me gerust direct op max@aimetmax.nl.");
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/kaarten"
        className="text-sm font-medium text-ink-soft hover:text-accent"
      >
        &larr; Terug naar de kaarten
      </Link>

      <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
        {/* product image */}
        <div className="warm-card overflow-hidden p-6">
          <Image
            src="/kaarten/doosje.png"
            alt="Doosje van de AI-gesprekskaarten"
            width={690}
            height={940}
            className="mx-auto h-auto w-full max-w-[340px]"
            priority
          />
        </div>

        {/* info */}
        <div>
          {BESTEL.preorder && (
            <span className="inline-block rounded-full border-2 border-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Pre-order
            </span>
          )}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">
            {BESTEL.naam}
          </h1>
          <p className="mt-2 text-lg text-ink-soft">{BESTEL.ondertitel}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink">{prijsTekst}</span>
            <span className="text-sm text-ink-soft">per set, incl. btw</span>
          </div>

          <ul className="mt-5 space-y-2">
            {BESTEL.inhoud.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-ink">
                <span className="font-bold text-sage">&#10003;</span>
                {r}
              </li>
            ))}
          </ul>

          {heeftBetaling ? (
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-3">
                <label htmlFor="aantal" className="text-sm font-medium text-ink">
                  Aantal
                </label>
                <select
                  id="aantal"
                  value={aantal}
                  onChange={(e) => setAantal(Number(e.target.value))}
                  className="rounded-xl border-2 border-line bg-card px-3 py-2 text-ink"
                >
                  {[1, 2, 3, 5, 10].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <a href={BESTEL.betaalLink} className="btn btn-primary">
                {BESTEL.preorder ? "Bestel nu (pre-order)" : "Bestel nu"}
              </a>
              <p className="mt-3 text-xs text-ink-soft">
                Veilig betalen via een beveiligde betaalpagina (o.a. iDEAL).{" "}
                {BESTEL.preorder ? BESTEL.levertijd + "." : ""}
              </p>
            </div>
          ) : (
            <div className="warm-card mt-7 bg-accent-soft p-6">
              <h2 className="hand text-2xl font-bold text-ink">
                {BESTEL.preorder
                  ? "Reserveer jouw set(s)"
                  : "Laat je gegevens achter"}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                De fysieke set is bijna klaar ({BESTEL.levertijd.toLowerCase()}).
                Laat je e-mail achter en het aantal dat je wilt, dan krijg je als
                eerste bericht zodra je kunt bestellen, met de definitieve prijs
                en verzending.
              </p>
              <form onSubmit={reserveer} className="mt-4">
                <div className="flex flex-wrap gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Je e-mailadres"
                    aria-label="Je e-mailadres"
                    autoComplete="email"
                    className="min-w-[200px] flex-1 rounded-xl border-2 border-ink bg-card px-4 py-3 text-ink outline-none focus:ring-4 focus:ring-hl"
                  />
                  <select
                    value={aantal}
                    onChange={(e) => setAantal(Number(e.target.value))}
                    aria-label="Aantal sets"
                    className="rounded-xl border-2 border-ink bg-card px-3 py-3 text-ink"
                  >
                    {[1, 2, 3, 5, 10, 25].map((n) => (
                      <option key={n} value={n}>
                        {n} set{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px opacity-0"
                />
                <button type="submit" className="btn btn-primary mt-3">
                  Zet me op de lijst
                </button>
              </form>
              {status ? (
                <p className="mt-3 text-sm font-semibold text-sage">{status}</p>
              ) : null}
            </div>
          )}

          <p className="mt-5 text-sm text-ink-soft">
            Liever eerst proberen? De{" "}
            <Link href="/kaarten" className="font-semibold text-accent underline">
              hele set staat gratis online
            </Link>{" "}
            en je kunt &apos;m{" "}
            <Link
              href="/kaarten/print"
              className="font-semibold text-accent underline"
            >
              thuis printen
            </Link>
            .
          </p>
        </div>
      </div>

      {/* voor teams / B2B */}
      <div className="warm-card mt-12 bg-sage-soft p-6 sm:p-10">
        <h2 className="hand text-2xl font-bold text-ink">
          Meerdere sets voor je organisatie?
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Wil je sets voor meerdere teams, of de kaarten combineren met een
          training of e-learning op maat (handig richting de AI Act-
          geletterdheidsplicht)? Stuur me een bericht, dan kijk ik mee.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={
              "mailto:max@aimetmax.nl?subject=" +
              encodeURIComponent("AI-gesprekskaarten voor mijn organisatie") +
              "&body=" +
              encodeURIComponent(
                [
                  "Hoi Max,",
                  "",
                  "Ik ben geinteresseerd in de AI-gesprekskaarten voor mijn organisatie.",
                  "(Aantal sets / aantal teams: ...)",
                  "",
                  "Groet,",
                ].join("\n"),
              )
            }
            className="btn btn-primary"
          >
            Neem contact op
          </a>
          <Link href="/contact" className="btn btn-ghost">
            AI-geletterdheid voor je organisatie
          </Link>
        </div>
      </div>
    </section>
  );
}
