"use client";

import { useState } from "react";

const ENDPOINT =
  "https://assets.mailerlite.com/jsonp/955238/forms/190102348162401531/subscribe";

export function LeadCapture() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot
    const email = String(data.get("email") || "").trim();
    if (!email) return;

    const fd = new FormData();
    fd.append("fields[email]", email);
    const leerwens = String(data.get("leerwens") || "").trim();
    if (leerwens) fd.append("fields[leerwens]", leerwens);
    fd.append("ml-submit", "1");
    fd.append("anticsrf", "true");

    setStatus("Versturen...");
    try {
      const r = await fetch(ENDPOINT, { method: "POST", body: fd });
      if (r.ok) {
        setStatus("Bijna klaar: check je inbox en bevestig je aanmelding.");
        form.reset();
      } else {
        setStatus("Dat ging mis. Probeer het later nog eens, of mail max@aimetmax.nl.");
      }
    } catch {
      setStatus("Dat ging mis. Probeer het later nog eens, of mail max@aimetmax.nl.");
    }
  }

  return (
    <div className="warm-card bg-accent-soft p-8">
      <h2 className="hand text-3xl font-bold text-ink">
        Nieuwe e-learning? Jij hoort het eerst.
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-soft">
        De gratis academy groeit. Laat je e-mail achter en krijg een seintje
        bij nieuwe modules en lessen. En vertel er gerust bij waar jij meer
        over wilt leren, want daar bouw ik het liefst op verder.
      </p>
      <form onSubmit={onSubmit} className="mt-5 flex flex-wrap gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Je e-mailadres"
          aria-label="Je e-mailadres"
          autoComplete="email"
          className="min-w-[220px] flex-1 rounded-xl border-2 border-ink bg-card px-4 py-3 text-ink outline-none focus:ring-4 focus:ring-hl"
        />
        <input
          type="text"
          name="leerwens"
          placeholder="Waar wil jij meer over leren? (optioneel)"
          aria-label="Waar wil jij meer over leren?"
          className="min-w-[220px] flex-1 rounded-xl border-2 border-ink bg-card px-4 py-3 text-ink outline-none focus:ring-4 focus:ring-hl"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <button type="submit" className="btn btn-primary">
          Houd me op de hoogte
        </button>
      </form>
      {status ? (
        <p className="mt-3 text-sm font-semibold text-sage">{status}</p>
      ) : null}
      <p className="mt-3 text-xs text-ink-soft">
        Geen spam: hooguit een paar mails per jaar, alleen over nieuwe lessen.
        Uitschrijven kan altijd met één klik.
      </p>
    </div>
  );
}
