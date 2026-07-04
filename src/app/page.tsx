import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadCapture } from "@/components/lead-capture";
import doosjeVoorkant from "../../public/kaarten/doosje-3d-voorkant.png";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ervaring = [
  {
    label: "Achtergrond",
    items: [
      "AI-docent, Universiteit van Amsterdam",
      "AI-expert bij een grote netbeheerder",
      "Auteur, Koninklijke Boom Uitgevers",
    ],
  },
  {
    label: "Trainingen en workshops voor o.a.",
    items: ["GGD GHOR", "NIVE", "UvA/HvA"],
  },
  {
    label: "Cursus- en projectwerk voor o.a.",
    items: ["Winc Academy", "een rijksdienst"],
  },
];

const testimonials = [
  {
    quote:
      "Wat een tof initiatief Max. Ook met veel plezier die kaarten getrokken.",
    name: "Ernst-Jan Pfauth",
    role: "Medeoprichter van De Correspondent",
  },
  {
    quote:
      "Max gaf een interessante en inspirerende workshop over AI op de kwartaalbijeenkomst van onze dienst. Heel beeldend, met duidelijke (en grappige) voorbeelden. Zowel beginners als gevorderde gebruikers gingen met nieuwe kennis naar huis (en minder angst voor AI).",
    name: "Olesia Sacharova",
    role: "Programmamanager Smart Buildings, UvA/HvA",
  },
  {
    quote:
      "Max focust zich op de kern, heeft een praktische benadering en beschrijft met humor en een persoonlijke noot herkenbare voorbeelden. Hij weet anderen te overtuigen en te enthousiasmeren. Een échte pionier.",
    name: "Mischa Daanen",
    role: "Redacteur AI-Pionier, Koninklijke Boom Uitgevers",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12">
        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border-2 border-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              AI-expert &amp; auteur van AI-Pionier
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Ik bouw AI én zorg dat het{" "}
              <span className="hand text-accent">landt</span>
            </h1>
            <p className="mt-6 text-lg text-ink-soft">
              Ik ben Max van den Broek. Ik bouw AI-toepassingen, train teams en
              begeleid het gesprek over wat je met AI wilt: begrijpelijk,
              praktisch en verantwoord. Auteur van AI-Pionier (Koninklijke Boom
              Uitgevers).
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/kaarten" className="btn btn-primary">
                Bekijk de AI-gesprekskaarten
              </Link>
              <Link href="/over" className="btn btn-ghost">
                Mijn verhaal
              </Link>
            </div>
          </div>
          <div className="shrink-0">
            <div className="warm-card -rotate-2 p-3">
              <Image
                src="/max-van-den-broek.jpg"
                alt="Max van den Broek"
                width={260}
                height={260}
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI-gesprekskaarten (hoofdproject) */}
      <section className="border-y-2 border-line bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="shrink-0">
              <div className="warm-card rotate-2 p-3">
                <Image
                  src={doosjeVoorkant}
                  alt="Het doosje van de AI-gesprekskaarten"
                  className="w-60 rounded-xl sm:w-72"
                  priority
                />
              </div>
            </div>
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Nieuw &middot; nu in voorverkoop
              </p>
              <h2 className="mt-2 hand text-3xl font-bold text-ink">
                De AI-gesprekskaarten
              </h2>
              <p className="mt-3 text-ink-soft">
                54 stellingen, dilemma&apos;s en open vragen waarmee je team het
                echte gesprek over AI voert. Wat doen we ermee, waar liggen de
                grenzen, wat spreken we af? Speel gratis online, print ze zelf,
                of bestel de gedrukte set in een stevig doosje.
              </p>
              <p className="mt-3 text-sm font-semibold text-ink">
                &euro; 29,95 &middot; voorverkoopactie: je krijgt er twee, één
                voor jou en één om cadeau te geven.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/kaarten/bestel" className="btn btn-primary">
                  Bestel de gedrukte set
                </Link>
                <Link href="/kaarten" className="btn btn-ghost">
                  Speel gratis online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="border-b-2 border-line py-7">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 sm:flex-row sm:justify-center sm:gap-12">
          {ervaring.map((groep) => (
            <div key={groep.label} className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {groep.label}
              </p>
              <div className="mt-1 flex flex-wrap justify-center gap-x-5 sm:justify-start">
                {groep.items.map((i) => (
                  <span key={i} className="hand text-lg text-ink-soft">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Boek + gratis e-learning */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="warm-card p-8">
              <div className="mb-5 w-fit -rotate-2 rounded-lg border-2 border-line bg-white p-1.5">
                <Image
                  src="/ai-pionier-cover.jpg"
                  alt="Voorkant van het boek AI-Pionier"
                  width={104}
                  height={148}
                  className="rounded-md"
                />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Boek
              </p>
              <h2 className="mt-2 hand text-2xl font-bold text-ink">
                AI-Pionier
              </h2>
              <p className="mt-3 text-sm text-ink-soft">
                Hoe jij ook begint met generatieve AI. Met 25+
                praktijkvoorbeelden en antwoorden op de meestgehoorde bezwaren.
                Uitgegeven door Koninklijke Boom Uitgevers.
              </p>
              <Link
                href="/boek"
                className="mt-4 inline-block font-semibold text-accent hover:text-accent-dark"
              >
                Meer over het boek &rarr;
              </Link>
            </div>
            <div className="warm-card p-8">
              <div className="mb-5">
                <svg
                  viewBox="0 0 120 70"
                  className="h-[148px] w-auto"
                  role="img"
                  aria-hidden="true"
                >
                  <path
                    d="M14 60 C 40 57, 84 61, 108 58"
                    stroke="#2A2A2A"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <g transform="rotate(-4 52 32)">
                    <rect
                      x="20"
                      y="12"
                      width="60"
                      height="40"
                      rx="6"
                      fill="#FFFDF8"
                      stroke="#2A2A2A"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M28 24 l 36 -1 M28 32 l 28 0 M28 40 l 20 0"
                      stroke="#2A2A2A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </g>
                  <path
                    d="M84 52 l -4 10 M92 52 l 4 10"
                    stroke="#E8590C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="88"
                    cy="44"
                    r="10"
                    fill="#FFE8A3"
                    stroke="#2A2A2A"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M83.5 44 l 3 3 l 7 -7"
                    stroke="#2A2A2A"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g stroke="#E8590C" strokeWidth="2" strokeLinecap="round">
                    <path d="M103 16 l 5 -5 M107 26 l 7 -2 M98 9 l 1 -6" />
                  </g>
                </svg>
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Gratis e-learning
              </p>
              <h2 className="mt-2 hand text-2xl font-bold text-ink">
                De AI met Max academy
              </h2>
              <p className="mt-3 text-sm text-ink-soft">
                Gratis e-learnings over wat AI is, hoe het werkt en hoe je het
                praktisch en verantwoord gebruikt. Met oefeningen, quizzen en
                een certificaat. Stuur ze gerust door naar je team.
              </p>
              <a
                href="/academy"
                className="mt-4 inline-block font-semibold text-accent hover:text-accent-dark"
              >
                Naar de academy &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t-2 border-line bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="hand text-3xl font-bold text-ink">Wat mensen over me zeggen</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="warm-card p-6">
                <blockquote className="text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-bold text-ink">{t.name}</span>
                  <span className="block text-ink-soft">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            De NIVE-workshop &ldquo;Begin met AI. Maar hoe?&rdquo; (Managersplatform
            Nederland) werd door deelnemers beoordeeld met een{" "}
            <mark className="font-semibold">gemiddelde 8,2</mark>.
          </p>
        </div>
      </section>

      {/* Samenwerken */}
      <section className="border-t-2 border-line py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <h2 className="hand text-3xl font-bold text-ink">Samenwerken?</h2>
            <p className="mt-3 text-ink-soft">
              Ik bouw AI-toepassingen en prototypes, geef trainingen en
              keynotes, en begeleid werksessies over wat je organisatie met AI
              wil. Mijn agenda zit op dit moment goed vol, maar voor een vraag,
              een keynote of iets voor later: stuur gerust een bericht.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/maxbroek"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Stuur een bericht op LinkedIn
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="border-t-2 border-line py-16">
        <div className="mx-auto max-w-5xl px-6">
          <LeadCapture />
        </div>
      </section>
    </>
  );
}
