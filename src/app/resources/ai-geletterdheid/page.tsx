import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-geletterdheid Resources - Cursussen, Video's en Handleidingen",
  description:
    "De beste gratis en betaalde resources om AI-geletterdheid te ontwikkelen. Cursussen, video's en handleidingen voor Nederlandse organisaties.",
};

const sections = [
  {
    title: "Gratis cursussen en e-learnings",
    items: [
      {
        name: "Elements of AI (Universiteit Helsinki)",
        url: "https://www.elementsofai.com/nl",
        description:
          "Gratis online cursus over de basisprincipes van AI. Beschikbaar in het Nederlands. Ideaal als startpunt voor iedereen.",
        tag: "Gratis",
      },
      {
        name: "Google AI Essentials (Coursera)",
        url: "https://www.coursera.org/learn/google-ai-essentials",
        description:
          "Google's eigen introductiecursus over AI. Engels, maar zeer toegankelijk. Circa 10 uur.",
        tag: "Gratis",
      },
      {
        name: "Microsoft Copilot Academy",
        url: "https://learn.microsoft.com/en-us/copilot/",
        description:
          "Microsoft's officiële leerplatform voor Copilot. Gratis, met modules per rol (HR, finance, management).",
        tag: "Gratis",
      },
      {
        name: "Prompt Engineering Guide (DAIR.ai)",
        url: "https://www.promptingguide.ai/",
        description:
          "Uitgebreide gids over prompt engineering technieken. Engels, technisch maar goed geschreven.",
        tag: "Gratis",
      },
      {
        name: "AI for Everyone (Andrew Ng, Coursera)",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        description:
          "De bekendste niet-technische AI-cursus ter wereld. Engels, circa 6 uur. Goed voor managers en beslissers.",
        tag: "Gratis",
      },
    ],
  },
  {
    title: "Video's en YouTube-kanalen",
    items: [
      {
        name: "3Blue1Brown - Neural Networks",
        url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
        description:
          "De beste visuele uitleg van hoe neurale netwerken werken. Engels, maar de animaties spreken voor zich.",
        tag: "Video",
      },
      {
        name: "AI Explained",
        url: "https://www.youtube.com/@aiexplained-official",
        description:
          "Heldere, genuanceerde video's over AI-ontwikkelingen. Goed voor wie op de hoogte wil blijven. Engels.",
        tag: "Video",
      },
      {
        name: "Fireship - AI in 100 Seconds",
        url: "https://www.youtube.com/@Fireship",
        description:
          "Korte, snelle video's die AI-concepten in ~5 minuten uitleggen. Technischer, maar vermakelijk. Engels.",
        tag: "Video",
      },
      {
        name: "Two Minute Papers",
        url: "https://www.youtube.com/@TwoMinutePapers",
        description:
          "Wetenschappelijke AI-doorbraken uitgelegd in 2-5 minuten. Enthousiast en toegankelijk. Engels.",
        tag: "Video",
      },
    ],
  },
  {
    title: "EU AI Act resources",
    items: [
      {
        name: "EU AI Act officiële tekst (Nederlands)",
        url: "https://eur-lex.europa.eu/legal-content/NL/TXT/?uri=CELEX:32024R1689",
        description:
          "De volledige wettekst in het Nederlands. Niet makkelijk leesbaar, maar de primaire bron.",
        tag: "Officieel",
      },
      {
        name: "AI Act Explorer (Future of Life Institute)",
        url: "https://artificialintelligenceact.eu/",
        description:
          "Doorzoekbare versie van de AI Act met uitleg per artikel. Engels maar zeer handig.",
        tag: "Gratis",
      },
      {
        name: "Autoriteit Persoonsgegevens - AI pagina",
        url: "https://www.autoriteitpersoonsgegevens.nl/themas/algoritmes-en-ai",
        description:
          "De Nederlandse toezichthouder over AI en privacy. Actuele guidance en handreikingen.",
        tag: "Officieel",
      },
      {
        name: "AI Act Checker (aimetmax.nl)",
        url: "/tools/ai-act-checker",
        description:
          "Onze eigen interactieve tool om te bepalen in welke risicocategorie jouw AI-toepassing valt.",
        tag: "Tool",
      },
    ],
  },
  {
    title: "Boeken",
    items: [
      {
        name: "AI-Pionier - Max van den Broek",
        url: "/boek",
        description:
          "Praktisch boek voor iedereen die wil beginnen met generatieve AI. 25+ voorbeelden. Nederlands.",
        tag: "Boek",
      },
      {
        name: "Co-Intelligence - Ethan Mollick",
        url: "https://www.bol.com/nl/nl/p/co-intelligence/9300000171892498/",
        description:
          "Hoe je AI als partner kunt inzetten in je werk. Geschreven door Wharton-professor die AI al jaren in onderwijs gebruikt. Engels.",
        tag: "Boek",
      },
      {
        name: "The AI-Savvy Leader - David De Cremer",
        url: "https://www.bol.com/nl/nl/f/the-ai-savvy-leader/9300000162237883/",
        description:
          "Specifiek voor leiders en managers. Hoe je AI-strategie vertaalt naar organisatiepraktijk. Engels.",
        tag: "Boek",
      },
    ],
  },
  {
    title: "Nieuwsbrieven en communities",
    items: [
      {
        name: "The Neuron",
        url: "https://www.theneurondaily.com/",
        description:
          "Dagelijkse AI-nieuwsbrief, goed geschreven en toegankelijk. Engels.",
        tag: "Nieuwsbrief",
      },
      {
        name: "TLDR AI",
        url: "https://tldr.tech/ai",
        description:
          "Beknopte dagelijkse samenvatting van AI-nieuws. Perfect als je weinig tijd hebt. Engels.",
        tag: "Nieuwsbrief",
      },
      {
        name: "Ben's Bites",
        url: "https://bensbites.beehiiv.com/",
        description:
          "Populaire AI-nieuwsbrief met focus op praktische toepassingen. Engels.",
        tag: "Nieuwsbrief",
      },
    ],
  },
];

const tagColors: Record<string, string> = {
  Gratis: "bg-green-100 text-green-700",
  Video: "bg-purple-100 text-purple-700",
  Officieel: "bg-blue-100 text-blue-700",
  Tool: "bg-amber-100 text-amber-700",
  Boek: "bg-rose-100 text-rose-700",
  Nieuwsbrief: "bg-cyan-100 text-cyan-700",
};

export default function AIGeletterdheidResources() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold text-gray-900">
        AI-geletterdheid Resources
      </h1>
      <p className="mt-4 text-gray-600">
        De beste cursussen, video&rsquo;s, handleidingen en tools om
        AI-geletterdheid te ontwikkelen. Samengesteld voor Nederlandse
        organisaties en professionals.
      </p>
      <p className="mt-2 text-sm text-gray-400">
        Lees ook:{" "}
        <Link
          href="/blog/ai-geletterdheid-verplicht"
          className="text-blue-600 hover:underline"
        >
          AI-geletterdheid is verplicht: praktisch stappenplan
        </Link>
      </p>

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-gray-900">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target={item.url.startsWith("/") ? undefined : "_blank"}
                  rel={
                    item.url.startsWith("/")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="block rounded-xl border border-gray-200 p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors[item.tag] || "bg-gray-100 text-gray-600"}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-gray-50 p-8">
        <h3 className="font-semibold text-gray-900">
          Op zoek naar een training op maat?
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Ik geef doelgroepgerichte AI-trainingen voor organisaties. Van
          Copilot-workshops voor controllers tot beleidssessies voor
          directieteams. Altijd hands-on, altijd op maat.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Neem contact op
        </Link>
      </div>
    </section>
  );
}
