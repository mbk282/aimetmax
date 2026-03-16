import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gratis AI-tools - Calculators, Checkers & Converters",
  description:
    "18+ gratis Nederlandse AI-tools die je direct in je browser kunt gebruiken. Converters, calculators, checkers en meer. Geen account nodig.",
};

const categories = [
  {
    name: "Calculators",
    description: "Bereken kosten, ROI en besparingen van AI-tools.",
    icon: "📊",
    tools: [
      {
        title: "AI ROI Calculator",
        description:
          "Bereken hoeveel jouw organisatie kan besparen met AI-automatisering.",
        href: "/tools/ai-roi-calculator",
      },
      {
        title: "Copilot ROI Calculator",
        description:
          "Is Microsoft Copilot de investering waard? Bereken het hier met echte cijfers.",
        href: "/tools/copilot-roi-calculator",
      },
      {
        title: "Vergaderkosten Calculator",
        description:
          "Wat kost jouw vergadering per minuut? Met live teller die meetikt.",
        href: "/tools/vergaderkosten-calculator",
      },
    ],
  },
  {
    name: "Checkers & Analyzers",
    description:
      "Analyseer teksten, prompts en documenten op kwaliteit en compliance.",
    icon: "✅",
    tools: [
      {
        title: "EU AI Act Checker",
        description:
          "Beantwoord 9 vragen en ontdek in welke risicocategorie jouw AI-toepassing valt.",
        href: "/tools/ai-act-checker",
      },
      {
        title: "Prompt Kwaliteit Checker",
        description:
          "Score je ChatGPT/Copilot prompt op 8 criteria en krijg concrete verbeter-tips.",
        href: "/tools/prompt-checker",
      },
      {
        title: "Leesbaarheid Checker",
        description:
          "Check het taalniveau van je Nederlandse tekst met de Flesch-Douma formule.",
        href: "/tools/leesbaarheid-checker",
      },
      {
        title: "LinkedIn Post Optimizer",
        description:
          "Analyseer je LinkedIn post op 7 factoren die bereik en engagement bepalen.",
        href: "/tools/linkedin-post-optimizer",
      },
      {
        title: "E-mail Onderwerpregel Scorer",
        description:
          "Test hoe effectief je e-mail onderwerpregel is. Spamwoorden, lengte en meer.",
        href: "/tools/email-onderwerp-scorer",
      },
      {
        title: "Vacaturetekst Inclusiviteit Checker",
        description:
          "Check je vacature op genderbias, leeftijdsbias en onnodige eisen.",
        href: "/tools/vacaturetekst-checker",
      },
    ],
  },
  {
    name: "Converters",
    description:
      "Converteer bestanden naar Markdown, direct in je browser. Privacy-vriendelijk.",
    icon: "🔄",
    tools: [
      {
        title: "PDF naar Markdown",
        description:
          "Converteer PDF bestanden naar Markdown. Privé, in je browser.",
        href: "/tools/pdf-naar-markdown",
      },
      {
        title: "Word naar Markdown",
        description: "Converteer Word (.docx) bestanden naar schone Markdown.",
        href: "/tools/word-naar-markdown",
      },
      {
        title: "HTML naar Markdown",
        description:
          "Plak HTML en krijg schone Markdown terug. Handig voor webpagina's.",
        href: "/tools/html-naar-markdown",
      },
      {
        title: "CSV naar Markdown Tabel",
        description:
          "Maak nette Markdown tabellen van je CSV of spreadsheetdata.",
        href: "/tools/csv-naar-markdown",
      },
      {
        title: "JSON naar Markdown",
        description:
          "Converteer JSON bestanden naar leesbare, gestructureerde Markdown.",
        href: "/tools/json-naar-markdown",
      },
      {
        title: "XML naar Markdown",
        description:
          "Converteer XML bestanden naar leesbare Markdown documentatie.",
        href: "/tools/xml-naar-markdown",
      },
      {
        title: "RTF naar Markdown",
        description:
          "Converteer RTF (Rich Text) bestanden naar Markdown.",
        href: "/tools/rtf-naar-markdown",
      },
    ],
  },
  {
    name: "Generators",
    description: "Genereer professionele content en documenten.",
    icon: "⚡",
    tools: [
      {
        title: "Email Handtekening Generator",
        description:
          "Maak een professionele email handtekening in 30 seconden. Voor Outlook, Gmail en meer.",
        href: "/tools/email-handtekening-generator",
      },
    ],
  },
  {
    name: "Educatie",
    description: "Leer AI-termen en concepten begrijpen.",
    icon: "📚",
    tools: [
      {
        title: "AI Woordenlijst",
        description:
          "Alle AI-termen uitgelegd in begrijpelijk Nederlands. Doorzoekbaar en filterbaar.",
        href: "/tools/ai-woordenlijst",
      },
    ],
  },
];

export default function ToolsPage() {
  const totalTools = categories.reduce(
    (acc, cat) => acc + cat.tools.length,
    0
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Gratis AI-tools
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          {totalTools} handige tools die je direct kunt gebruiken, zonder
          account. Alles draait in je browser - je data blijft privé.
        </p>
      </div>

      {/* Category nav pills */}
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`#${cat.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            <span>{cat.icon}</span>
            {cat.name}
            <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {cat.tools.length}
            </span>
          </a>
        ))}
      </div>

      {/* Categories */}
      <div className="mt-16 space-y-16">
        {categories.map((category) => (
          <div
            key={category.name}
            id={category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{category.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.name}
                </h2>
                <p className="mt-1 text-gray-500">{category.description}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {tool.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 opacity-0 transition group-hover:opacity-100">
                    Gebruik tool →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-12">
        <div className="max-w-2xl">
          <h3 className="text-xl font-bold text-gray-900">
            Mist er een tool?
          </h3>
          <p className="mt-3 text-gray-600">
            Ik bouw regelmatig nieuwe tools. Heb je een idee voor een handige
            AI-tool? Of wil je een tool op maat voor jouw organisatie? Laat het
            me weten.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Neem contact op
          </Link>
        </div>
      </div>
    </section>
  );
}
