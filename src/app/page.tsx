import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadCapture } from "@/components/lead-capture";

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
              AI-trainer &amp; auteur van AI-Pionier
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              AI werkend krijgen in{" "}
              <span className="hand text-accent">jouw organisatie</span>
            </h1>
            <p className="mt-6 text-lg text-ink-soft">
              Ik ben Max van den Broek. Ik help organisaties AI-geletterd te
              worden, met e-learnings op maat, hands-on trainingen en werkende
              prototypes. Nuchter, praktisch, en met voorbeelden uit jullie
              eigen werk.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary">
                Regel AI-geletterdheid voor je organisatie
              </Link>
              <a href="/academy" className="btn btn-ghost">
                Bekijk de gratis academy
              </a>
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

      {/* Credibility strip */}
      <section className="border-y-2 border-line bg-card py-7">
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

      {/* Gratis academy (prominent) */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="warm-card flex flex-col items-start gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Gratis e-learnings
              </p>
              <h2 className="mt-2 hand text-3xl font-bold text-ink">
                De AI met Max academy
              </h2>
              <p className="mt-3 text-ink-soft">
                Zes gratis e-learnings die je leren wat AI is, hoe het werkt en
                hoe je het praktisch en verantwoord gebruikt. Met handgetekende
                illustraties, oefeningen die je meteen zelf doet, quizzen en
                certificaten. Ideaal om naar je team te sturen: het ondersteunt
                de AI-geletterdheidsplicht (artikel 4 AI-verordening).
              </p>
            </div>
            <a href="/academy" className="btn btn-primary shrink-0">
              Naar de academy
            </a>
          </div>
        </div>
      </section>

      {/* Wat ik doe */}
      <section className="border-t-2 border-line py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="hand text-3xl font-bold text-ink">Wat ik voor je doe</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="warm-card p-6">
              <h3 className="font-bold text-ink">E-learnings op maat</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Doelgroepgerichte AI-e-learnings met jullie eigen voorbeelden,
                tools en beleid. Schaalbaar, met toetsing en certificaten, en
                onderbouwing voor de AI-geletterdheidsplicht.
              </p>
            </div>
            <div className="warm-card p-6">
              <h3 className="font-bold text-ink">Trainingen &amp; keynotes</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Hands-on trainingen waarin mensen meteen zelf oefenen, van
                Copilot voor controllers tot AI voor developers. Plus
                inspirerende, toegankelijke lezingen.
              </p>
            </div>
            <div className="warm-card p-6">
              <h3 className="font-bold text-ink">Prototypes &amp; POCs</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Ik bouw werkende prototypes en simpele AI-tools, zodat je snel
                ziet wat AI voor jouw team kan betekenen in plaats van erover te
                praten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t-2 border-line bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="hand text-3xl font-bold text-ink">Wat deelnemers zeggen</h2>
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

      {/* Lead capture */}
      <section className="border-t-2 border-line py-16">
        <div className="mx-auto max-w-5xl px-6">
          <LeadCapture />
        </div>
      </section>

      {/* Boek */}
      <section className="border-t-2 border-line py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Boek
            </p>
            <h2 className="mt-2 hand text-3xl font-bold text-ink">AI-Pionier</h2>
            <p className="mt-3 text-ink-soft">
              Hoe jij ook begint met generatieve AI. Met 25+ praktijkvoorbeelden
              en antwoorden op de meestgehoorde bezwaren. Uitgegeven door
              Koninklijke Boom Uitgevers.
            </p>
            <Link
              href="/boek"
              className="mt-4 inline-block font-semibold text-accent hover:text-accent-dark"
            >
              Meer over het boek &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Gratis tools (lichter, onderaan) */}
      <section className="border-t-2 border-line bg-card py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="hand text-3xl font-bold text-ink">Gratis tools en werkvormen</h2>
          <p className="mt-2 max-w-3xl text-ink-soft">
            Kleine, handige tools die direct in je browser draaien, zonder
            account. Onder meer de{" "}
            <Link href="/tools/ai-readiness-scorer" className="font-semibold text-accent hover:text-accent-dark">
              Document AI-readiness Checker
            </Link>{" "}
            (is je kennisbank klaar voor Copilot?), een{" "}
            <Link href="/tools/ai-act-checker" className="font-semibold text-accent hover:text-accent-dark">
              AI Act-checker
            </Link>
            , en de{" "}
            <Link href="/kaarten" className="font-semibold text-accent hover:text-accent-dark">
              AI-gesprekskaarten
            </Link>{" "}
            om met je team het goede gesprek over AI te voeren. Je data blijft privé.
          </p>
          <Link
            href="/tools"
            className="mt-5 inline-block font-semibold text-accent hover:text-accent-dark"
          >
            Bekijk alle tools &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
