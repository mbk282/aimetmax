import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AI-Pionier - Het boek",
  description:
    "AI-Pionier: Hoe jij ook begint met generatieve AI. Met 25+ praktijkvoorbeelden. Door Max van den Broek, uitgegeven door Koninklijke Boom Uitgevers.",
  alternates: { canonical: "/boek" },
};

const winkels = [
  {
    naam: "Managementboek.nl",
    href: "https://www.managementboek.nl/boek/9789024467129",
  },
  { naam: "Bol.com", href: "https://www.bol.com/nl/nl/p/ai-pionier/9300000178307051/" },
  { naam: "Amazon.nl", href: "https://www.amazon.nl/dp/9789024467129" },
];

export default function BoekPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-col items-start gap-8 sm:flex-row">
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Boek &middot; Koninklijke Boom Uitgevers
          </p>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
            AI-Pionier: Hoe jij ook begint met generatieve AI
          </h1>
          <p className="mt-6 text-lg text-ink-soft">
            Het praktische boek voor iedereen die wil beginnen met generatieve AI.
            Toegankelijk geschreven, met humor en herkenbare voorbeelden.
          </p>
        </div>
        <a
          href="https://www.managementboek.nl/boek/9789024467129"
          target="_blank"
          rel="noopener noreferrer"
          className="warm-card rotate-2 shrink-0 self-center p-2.5 transition hover:rotate-0 sm:self-start"
        >
          <Image
            src="/ai-pionier-cover.jpg"
            alt="Voorkant van het boek AI-Pionier door Max van den Broek"
            width={200}
            height={284}
            className="rounded-lg"
            priority
          />
        </a>
      </div>

      <div className="mt-10 space-y-4 text-ink-soft">
        <h2 className="hand text-2xl font-bold text-ink">Wat je leert</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>De belangrijkste voordelen van AI voor jou en je organisatie.</li>
          <li>25+ praktijkvoorbeelden van hoe mensen generatieve AI gebruiken.</li>
          <li>
            10+ veelgehoorde bezwaren (inclusief privacy) en hoe je ermee omgaat.
          </li>
        </ul>

        <figure className="warm-card mt-6 p-6">
          <blockquote className="text-ink">
            &ldquo;Max schrijft toegankelijk over AI, focust op de kern en
            beschrijft met humor herkenbare voorbeelden. Een échte
            pionier.&rdquo;
          </blockquote>
          <figcaption className="mt-3 text-sm text-ink-soft">
            Mischa Daanen, redacteur AI-Pionier
          </figcaption>
        </figure>

        <h2 className="hand pt-4 text-2xl font-bold text-ink">Bestellen</h2>
        <div className="flex flex-wrap gap-3">
          {winkels.map((w) => (
            <a
              key={w.naam}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !px-4 !py-2 text-sm"
            >
              {w.naam}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
