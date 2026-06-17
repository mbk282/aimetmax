import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-geletterdheid voor jouw organisatie",
  description:
    "Regel de AI-geletterdheid van je organisatie met maatwerk e-learnings, trainingen en keynotes van Max van den Broek. Met onderbouwing voor artikel 4 van de AI-verordening.",
  alternates: { canonical: "/contact" },
};

const aanbod = [
  {
    titel: "E-learning op maat",
    vanaf: "vanaf € 12.500 per traject",
    beschrijving:
      "Doelgroepspecifieke AI-e-learnings met jullie eigen voorbeelden, tools en beleid. Inclusief intake, doelgroepscan, 3 tot 5 modules met toetsing en certificaten, en een pilotronde. Schaalbaar naar het hele personeelsbestand en onderbouwd voor de AI-geletterdheidsplicht (artikel 4).",
    accent: true,
  },
  {
    titel: "Losse module of training",
    vanaf: "module vanaf € 4.500 · incompany trainingsdag vanaf € 2.950",
    beschrijving:
      "Een enkele e-learningmodule op maat, of een hands-on incompany trainingsdag waarin je team meteen zelf oefent met de eigen werkpraktijk. Van Copilot voor controllers tot AI voor developers.",
  },
  {
    titel: "Update-abonnement",
    vanaf: "vanaf € 1.500 per kwartaal",
    beschrijving:
      "AI-kennis veroudert snel. Met een kwartaalupdate houd ik jullie e-learnings actueel: nieuwe voorbeelden, nieuwe tools, en aanpassingen aan veranderende wetgeving. Zo blijft je materiaal up-to-date zonder dat je telkens een nieuw traject hoeft in te kopen.",
  },
  {
    titel: "Keynote of lezing",
    vanaf: "vanaf € 2.950",
    beschrijving:
      "Een inspirerende, toegankelijke en nuchtere lezing over AI voor conferenties, bedrijfsdagen en teambijeenkomsten. Beeldend, met herkenbare voorbeelden.",
  },
];

const offerteMail =
  "mailto:max@aimetmax.nl?subject=" +
  encodeURIComponent("Voorstel AI-geletterdheid / maatwerk e-learning") +
  "&body=" +
  encodeURIComponent(
    [
      "Hoi Max,",
      "",
      "Ik wil graag een offerte aanvragen. Hieronder wat context:",
      "",
      "- Organisatie: ",
      "- Mijn rol: ",
      "- Waar we naar zoeken (training / e-learning op maat / keynote / anders): ",
      "- Doelgroep en aantal mensen: ",
      "- Gewenste timing: ",
      "- Eventueel budgetindicatie: ",
      "",
      "Groet,",
    ].join("\n"),
  );

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">
        Voor organisaties
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        AI-geletterdheid, geregeld voor jouw organisatie
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        De{" "}
        <a href="/academy" className="font-semibold text-accent hover:text-accent-dark">
          gratis academy
        </a>{" "}
        laat zien hoe ik het doe. Wil je hetzelfde, maar dan met jullie eigen
        voorbeelden, tools en beleid, en aantoonbaar voor de
        AI-geletterdheidsplicht? Dat lever ik op maat. Tien losse incompany
        sessies kosten al snel meer dan € 25.000 en schalen niet mee; een
        e-learning op maat doet dat wel.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <a href={offerteMail} className="btn btn-primary">
          Vraag een voorstel aan
        </a>
        <a
          href="https://www.linkedin.com/in/maxbroek"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Stuur een bericht op LinkedIn
        </a>
      </div>

      {/* Aanbod */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {aanbod.map((a) => (
          <div
            key={a.titel}
            className={`warm-card p-6 ${a.accent ? "bg-accent-soft" : ""}`}
          >
            <h2 className="hand text-2xl font-bold text-ink">{a.titel}</h2>
            <p className="mt-1 text-sm font-semibold text-accent">{a.vanaf}</p>
            <p className="mt-3 text-sm text-ink-soft">{a.beschrijving}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl text-sm text-ink-soft">
        Dit zijn richtbedragen vanaf; de exacte prijs hangt af van omvang, aantal
        modules en doelgroepen. Zo weet je vooraf of het bij je budget past en
        krijg je altijd een offerte op maat. Past dit (nog) niet bij je budget?
        Begin dan met de{" "}
        <a href="/academy" className="font-semibold text-accent hover:text-accent-dark">
          gratis academy
        </a>
        . Voor MKB is er vaak subsidie mogelijk (zoals de SLIM-regeling) die de
        netto-investering flink verlaagt; ik denk graag mee.
      </p>

      {/* Waarom Max */}
      <div className="warm-card mt-12 p-8">
        <h2 className="hand text-2xl font-bold text-ink">Waarom met mij werken</h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-ink-soft sm:grid-cols-2">
          <li>
            <strong className="text-ink">Auteur van AI-Pionier</strong> (Boom) en
            voormalig AI-docent aan de UvA.
          </li>
          <li>
            <strong className="text-ink">Hands-on en nuchter:</strong> mensen
            oefenen meteen zelf, met hun eigen werk.
          </li>
          <li>
            <strong className="text-ink">Adoptie staat centraal:</strong> niet
            alleen kennis overdragen, maar zorgen dat AI echt gebruikt wordt.
          </li>
          <li>
            <strong className="text-ink">Aantoonbaar:</strong> toetsing,
            certificaten en onderbouwing voor artikel 4 van de AI-verordening.
          </li>
        </ul>
        <p className="mt-4 text-sm text-ink-soft">
          Benieuwd waar deze aanpak op rust? Lees over{" "}
          <Link href="/methode" className="font-semibold text-accent hover:text-accent-dark">
            onze methode
          </Link>{" "}
          en de wetenschappelijke onderbouwing.
        </p>
      </div>

      <p className="mt-10 text-ink-soft">
        Liever eerst vrijblijvend sparren? Mail me op{" "}
        <a
          href="mailto:max@aimetmax.nl"
          className="font-semibold text-accent hover:text-accent-dark"
        >
          max@aimetmax.nl
        </a>{" "}
        of bekijk eerst de{" "}
        <Link href="/academy" className="font-semibold text-accent hover:text-accent-dark">
          gratis e-learnings
        </Link>
        .
      </p>
    </section>
  );
}
