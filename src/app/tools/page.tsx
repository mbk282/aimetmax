import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gratis AI-tools - Checkers, Converters & meer",
  description:
    "18+ gratis Nederlandse AI-tools die je direct in je browser kunt gebruiken. Checkers, converters, een AI-woordenlijst en meer. Geen account nodig.",
  alternates: { canonical: "/tools" },
};

const categories = [
  {
    name: "Werkvormen voor teams",
    description:
      "Materiaal om met je team het gesprek over AI te voeren, niet alleen erover te lezen.",
    tools: [
      {
        title: "AI-gesprekskaarten",
        description:
          "54 stellingen, dilemma's en open vragen voor het goede gesprek over AI op de werkvloer. Met facilitator-notes en presenteermodus.",
        href: "/kaarten",
      },
    ],
  },
  {
    name: "Checkers & Analyzers",
    description:
      "Analyseer teksten, prompts en documenten op kwaliteit en compliance.",
    tools: [
      {
        title: "Document AI-readiness Checker",
        description:
          "Hoe goed kan AI (Copilot, RAG, chatbots) jouw document gebruiken? Krijg een score en concrete verbeterpunten.",
        href: "/tools/ai-readiness-scorer",
      },
      {
        title: "EU AI Act Checker",
        description:
          "Beantwoord 9 vragen en ontdek in welke risicocategorie jouw AI-toepassing valt.",
        href: "/tools/ai-act-checker",
      },
      {
        title: "AI-gebruiksbeleid Generator",
        description:
          "Stel in een paar minuten een startversie van een AI-gebruiksbeleid op voor je organisatie.",
        href: "/tools/ai-beleid-generator",
      },
      {
        title: "AI Act Risicowijzer",
        description:
          "Zoek je AI-toepassing op (werving, chatbot, Copilot) en zie meteen in welke risicocategorie die valt.",
        href: "/tools/ai-act-risicowijzer",
      },
      {
        title: "Prompt Kwaliteit Checker",
        description:
          "Score je ChatGPT- of Copilot-prompt op 8 criteria en krijg concrete verbetertips.",
        href: "/tools/prompt-checker",
      },
      {
        title: "Leesbaarheid Checker",
        description:
          "Check het taalniveau van je Nederlandse tekst met de Flesch-Douma-formule.",
        href: "/tools/leesbaarheid-checker",
      },
      {
        title: "Vacaturetekst Inclusiviteit Checker",
        description:
          "Check je vacature op genderbias, leeftijdsbias en onnodige eisen.",
        href: "/tools/vacaturetekst-checker",
      },
      {
        title: "LinkedIn Post Optimizer",
        description:
          "Analyseer je LinkedIn-post op 7 factoren die bereik en engagement bepalen.",
        href: "/tools/linkedin-post-optimizer",
      },
      {
        title: "E-mail Onderwerpregel Scorer",
        description:
          "Test hoe effectief je e-mail-onderwerpregel is. Spamwoorden, lengte en meer.",
        href: "/tools/email-onderwerp-scorer",
      },
    ],
  },
  {
    name: "Educatie",
    description: "Leer AI-termen en concepten begrijpen.",
    tools: [
      {
        title: "AI Woordenlijst",
        description:
          "Alle AI-termen uitgelegd in begrijpelijk Nederlands. Doorzoekbaar en filterbaar.",
        href: "/tools/ai-woordenlijst",
      },
    ],
  },
  {
    name: "Converters",
    description:
      "Converteer bestanden naar Markdown, direct in je browser. Privacyvriendelijk.",
    tools: [
      {
        title: "PDF naar Markdown",
        description: "Converteer PDF-bestanden naar Markdown. Privé, in je browser.",
        href: "/tools/pdf-naar-markdown",
      },
      {
        title: "Word naar Markdown",
        description: "Converteer Word-bestanden (.docx) naar schone Markdown.",
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
        description: "Maak nette Markdown-tabellen van je CSV- of spreadsheetdata.",
        href: "/tools/csv-naar-markdown",
      },
      {
        title: "JSON naar Markdown",
        description:
          "Converteer JSON-bestanden naar leesbare, gestructureerde Markdown.",
        href: "/tools/json-naar-markdown",
      },
      {
        title: "XML naar Markdown",
        description: "Converteer XML-bestanden naar leesbare Markdown-documentatie.",
        href: "/tools/xml-naar-markdown",
      },
      {
        title: "RTF naar Markdown",
        description: "Converteer RTF-bestanden (Rich Text) naar Markdown.",
        href: "/tools/rtf-naar-markdown",
      },
    ],
  },
  {
    name: "Generators",
    description: "Genereer professionele content en documenten.",
    tools: [
      {
        title: "E-mail Handtekening Generator",
        description:
          "Maak een professionele e-mailhandtekening in 30 seconden. Voor Outlook, Gmail en meer.",
        href: "/tools/email-handtekening-generator",
      },
    ],
  },
  {
    name: "Calculators",
    description: "Snelle reken-tools voor kosten en besparingen.",
    tools: [
      {
        title: "Vergaderkosten Calculator",
        description:
          "Wat kost jouw vergadering per minuut? Met een live teller die meetikt.",
        href: "/tools/vergaderkosten-calculator",
      },
      {
        title: "AI ROI Calculator",
        description:
          "Maak een eerste schatting van wat AI-automatisering je organisatie kan besparen.",
        href: "/tools/ai-roi-calculator",
      },
      {
        title: "Copilot ROI Calculator",
        description:
          "Een eerste indicatie of Microsoft Copilot de investering waard is.",
        href: "/tools/copilot-roi-calculator",
      },
    ],
  },
];

export default function ToolsPage() {
  const totalTools = categories.reduce((acc, cat) => acc + cat.tools.length, 0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-ink">
          Gratis AI-tools
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          {totalTools} handige tools die je direct kunt gebruiken, zonder
          account. Alles draait in je browser, dus je data blijft privé.
        </p>
      </div>

      {/* Category nav pills */}
      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`#${cat.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-card px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-accent hover:text-accent"
          >
            {cat.name}
            <span className="ml-1 rounded-full bg-paper px-2 py-0.5 text-xs text-ink-soft">
              {cat.tools.length}
            </span>
          </a>
        ))}
      </div>

      {/* Categories */}
      <div className="mt-14 space-y-14">
        {categories.map((category) => (
          <div
            key={category.name}
            id={category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}
          >
            <h2 className="hand text-2xl font-bold text-ink">{category.name}</h2>
            <p className="mt-1 text-ink-soft">{category.description}</p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group warm-card flex flex-col p-6 transition hover:-translate-y-0.5"
                >
                  <h3 className="font-bold text-ink group-hover:text-accent">
                    {tool.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                    Gebruik tool &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="warm-card mt-16 bg-sage-soft p-8 sm:p-10">
        <div className="max-w-2xl">
          <h3 className="hand text-2xl font-bold text-ink">
            Wil je een tool of e-learning op maat?
          </h3>
          <p className="mt-3 text-ink-soft">
            Deze tools zijn gratis en bewust klein gehouden. Wil je iets dat
            echt aansluit op jullie werk, een AI-training of een e-learning met
            jullie eigen voorbeelden? Laat het me weten.
          </p>
          <Link href="/contact" className="btn btn-primary mt-6">
            Neem contact op
          </Link>
        </div>
      </div>
    </section>
  );
}
