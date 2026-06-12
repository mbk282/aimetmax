import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over Max van den Broek",
  description:
    "Max van den Broek: AI-trainer en auteur van AI-Pionier. MSc Logic (UvA), voormalig Senior AI-docent aan de UvA, was AI-expert bij Alliander, nu zelfstandig.",
};

const testimonials = [
  {
    quote:
      "Max gaf een interessante en inspirerende workshop over AI op de kwartaalbijeenkomst van onze dienst. Heel beeldend, met duidelijke (en grappige) voorbeelden. Zowel beginners als gevorderde gebruikers gingen met nieuwe kennis naar huis (en minder angst voor AI).",
    name: "Olesia Sacharova",
    role: "Programmamanager Smart Buildings, UvA/HvA",
  },
  {
    quote:
      "Max is bijzonder gepassioneerd en enorm bevlogen om zijn kennis te delen. Hij schrijft toegankelijk over AI, focust op de kern, heeft een praktische benadering en beschrijft met humor herkenbare voorbeelden. Een échte pionier.",
    name: "Mischa Daanen",
    role: "Redacteur AI-Pionier, Koninklijke Boom Uitgevers",
  },
];

export default function OverPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="warm-card -rotate-2 p-2.5 shrink-0">
          <Image
            src="/max-van-den-broek.jpg"
            alt="Max van den Broek"
            width={150}
            height={150}
            className="rounded-xl object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">Over Max</h1>
          <p className="mt-2 text-ink-soft">
            AI-trainer &middot; auteur van AI-Pionier &middot; voormalig
            AI-docent aan de UvA
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-4 text-ink-soft">
        <p>
          Ik ben Max van den Broek. Ik help organisaties om AI slim en
          verantwoord te gebruiken: met trainingen, e-learnings op maat en
          werkende prototypes. Mijn achtergrond is een MSc Logic aan de
          Universiteit van Amsterdam.
        </p>
        <p>
          Vier jaar lang was ik <strong>AI-docent aan de UvA</strong>, waar ik
          cursussen over (generatieve) AI ontwikkelde en honderden studenten en
          professionals op weg hielp. Daarna was ik <strong>AI-expert bij
          Alliander</strong>: daar gaf ik onder meer doelgroepgerichte
          AI-trainingen, naast het bouwen van proofs-of-concept en advies over
          verantwoord AI-gebruik. Inmiddels werk ik zelfstandig. Op dit moment
          doe ik een opdracht voor de <strong>RVO</strong>, maakte ik een
          AI-cursus voor <strong>Winc Academy</strong>, en geef ik AI-trainingen
          en keynotes voor uiteenlopende organisaties.
        </p>
        <p>
          Ik schreef het boek{" "}
          <strong>AI-Pionier: Hoe jij ook begint met generatieve AI</strong>,
          uitgegeven door Koninklijke Boom Uitgevers.
        </p>

        <h2 className="hand pt-6 text-2xl font-bold text-ink">
          Hoe ik werk bij organisaties
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Doelgroepgerichte trainingen: financiele voorbeelden voor
            controllers, contractanalyse voor juristen, code voor developers.
          </li>
          <li>
            Hands-on: deelnemers oefenen direct zelf met hun eigen werk, want
            dat versnelt de adoptie.
          </li>
          <li>
            E-learnings het liefst samen met iemand uit het team, voor maximale
            aansluiting en peer learning.
          </li>
          <li>
            Ik bouw POC&apos;s en simpele AI-tools, en zorg dat mensen ze
            daadwerkelijk gaan gebruiken.
          </li>
        </ul>
      </div>

      {/* Testimonials */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="warm-card p-6">
            <blockquote className="text-sm text-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-bold text-ink">{t.name}</span>
              <span className="block text-ink-soft">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-5 text-sm text-ink-soft">
        Mijn NIVE-workshop &ldquo;Begin met AI. Maar hoe?&rdquo; (Managersplatform
        Nederland, maart 2025) werd door deelnemers beoordeeld met een gemiddelde
        van <mark className="font-semibold">8,2</mark>.
      </p>

      <div className="mt-12">
        <Link href="/contact" className="btn btn-primary">
          Training of offerte aanvragen
        </Link>
      </div>
    </section>
  );
}
