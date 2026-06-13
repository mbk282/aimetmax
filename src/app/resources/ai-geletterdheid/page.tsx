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
  Gratis: "bg-sage-soft text-sage",
  Video: "bg-accent-soft text-accent-dark",
  Officieel: "bg-paper text-ink-soft",
  Tool: "bg-hl text-ink",
  Boek: "bg-accent-soft text-accent-dark",
  Nieuwsbrief: "bg-sage-soft text-sage",
};

export default function AIGeletterdheidResources() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">
        AI-geletterdheid Resources
      </h1>
      <p className="mt-4 text-ink-soft">
        De beste cursussen, video&rsquo;s, handleidingen en tools om
        AI-geletterdheid te ontwikkelen. Samengesteld voor Nederlandse
        organisaties en professionals.
      </p>
      <p className="mt-2 text-sm text-ink-soft">
        Lees ook:{" "}
        <Link
          href="/blog/ai-geletterdheid-verplicht"
          className="font-medium text-accent hover:text-accent-dark"
        >
          AI-geletterdheid is verplicht: praktisch stappenplan
        </Link>
      </p>

      <div className="mt-12 space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="hand text-2xl font-bold text-ink">
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
                  className="block rounded-xl border-2 border-line bg-card p-5 transition hover:border-accent hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-ink">{item.name}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors[item.tag] || "bg-paper text-ink-soft"}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="warm-card mt-16 bg-sage-soft p-8">
        <h3 className="hand text-2xl font-bold text-ink">
          Zelf beginnen of samen aanpakken?
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          De laagdrempeligste eerste stap is de gratis{" "}
          <a
            href="/academy"
            className="font-medium text-accent hover:text-accent-dark"
          >
            AI-academy
          </a>
          : korte e-learnings over AI-geletterdheid die je medewerkers in eigen
          tempo doorlopen. Wil je een programma dat past bij jouw rollen en
          sector, dan maak ik maatwerk e-learnings en trainingen op maat,
          doelgroepgericht en met ruimte om zelf te oefenen.
        </p>
        <Link href="/contact" className="btn btn-primary mt-5">
          Neem contact op
        </Link>
      </div>
    </section>
  );
}
