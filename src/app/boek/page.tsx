import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Pionier - Het boek",
  description:
    "AI-Pionier: Hoe jij ook begint met generatieve AI. Met 25+ praktijkvoorbeelden. Door Max van den Broek.",
};

export default function BoekPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold text-gray-900">
        AI-Pionier: Hoe jij ook begint met generatieve AI
      </h1>
      <p className="mt-6 text-lg text-gray-600">
        Het praktische boek voor iedereen die wil beginnen met generatieve AI.
      </p>
      <div className="mt-8 space-y-4 text-gray-600">
        <h2 className="text-xl font-semibold text-gray-900">Wat je leert</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>De belangrijkste voordelen van AI voor jou en je organisatie</li>
          <li>25+ praktijkvoorbeelden van hoe mensen generatieve AI gebruiken</li>
          <li>
            10+ veelgehoorde bezwaren (inclusief privacy) en hoe je ermee omgaat
          </li>
        </ul>
        <h2 className="pt-4 text-xl font-semibold text-gray-900">Bestellen</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.managementboek.nl/boek/9789024467129"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Managementboek.nl
          </a>
          <a
            href="https://www.bol.com/nl/nl/p/ai-pionier/9300000178307051/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Bol.com
          </a>
          <a
            href="https://www.amazon.nl/dp/9789024467129"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Amazon.nl
          </a>
        </div>
      </div>
    </section>
  );
}
