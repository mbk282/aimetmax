import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Onze methode: waarom deze aanpak werkt",
  description:
    "De academy en trainingen van AI met Max rusten op AI-literacy-onderzoek en de AI-verordening. Vijf onderbouwde principes: leer door te doen, rolspecifiek, nuchter, adoptie boven techniek.",
  alternates: { canonical: "/methode" },
};

const principes = [
  {
    titel: "Leer door te doen",
    body: "AI-geletterdheid is geen kennis die je passief opdoet. Een van de kerncompetenties is het kunnen tóépassen, en dat leer je alleen door het zelf te doen, met je eigen werk. AI helpt bovendien binnen een grillige grens: aan de ene kant van een taak word je er aantoonbaar sneller en beter mee, aan de andere kant juist slechter. Waar die grens ligt, verschilt per taak en ontdek je alleen door te oefenen. En je eigen gevoel is geen betrouwbare meter: onderzoek laat zien dat mensen zich sneller voelen terwijl ze het in werkelijkheid niet zijn. Daarom: zelf doen én nameten.",
  },
  {
    titel: "Afgestemd op je rol",
    body: "Een generieke AI-cursus voor de hele organisatie volstaat niet, en dat is geen mening: artikel 4 van de AI-verordening schrijft letterlijk voor dat het niveau moet aansluiten op de kennis, ervaring en gebruikscontext van de persoon. Een controller heeft andere voorbeelden nodig dan een jurist of een developer. Iedereen een stevige basis, specialisten dieper: dat is het ontwerpprincipe. In de praktijk betekent het financiële cases voor finance, contractvoorbeelden voor juristen, code voor developers.",
  },
  {
    titel: "Nuchter: geijkt vertrouwen",
    body: "Het doel is niet blind vertrouwen in AI, en ook niet reflexmatige afwijzing, maar geijkt vertrouwen: weten waar het ding sterk is en waar het je laat vallen. Daarom adresseert de aanpak de hardnekkige misvattingen expliciet (AI is geen zoekmachine, het verzint met overtuiging, het is niet neutraal) en leert hij je verifiëren in plaats van alleen gebruiken. Geen hype, geen doemdenken.",
  },
  {
    titel: "Adoptie boven techniek",
    body: "De meeste AI-implementaties stranden niet op de techniek maar op mensen en processen. Een veelgenoemde vuistregel uit onderzoek van BCG: het overgrote deel van de uitdaging zit in verandering en werkwijze, een veel kleiner deel in de algoritmen zelf. Daarom ligt de nadruk op zorgen dat AI daadwerkelijk landt bij mensen, niet op het uitrollen van licenties.",
  },
  {
    titel: "Houding en samen leren",
    body: "Of mensen AI gebruiken, hangt minstens zo sterk af van hun zelfvertrouwen en houding als van hun kennis. AI-geletterdheid ontwikkelt zich bovendien grotendeels sociaal en informeel: mensen leren het van elkaar. Verborgen gebruik ondermijnt dat collectieve leren. Daarom maak ik trainingen het liefst samen met iemand uit het team zelf, en is veilig kunnen delen wat je ontdekt onderdeel van de aanpak.",
  },
];

const kaders = [
  "Long & Magerko (2020) - de meest geciteerde set AI-literacy-competenties",
  "Ng et al. (2021, 2024) - vier competenties + houding en motivatie (ABCE-model)",
  "UNESCO AI competency frameworks (2024) - voor leerlingen en docenten",
  "EU DigComp 2.2 (2022) - AI verweven in digitale geletterdheid",
  "OECD - elementaire AI-geletterdheid voor werkenden",
  "EU AI-verordening, artikel 4 - de wettelijke geletterdheidsplicht",
];

export default function MethodePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">
        Onze methode
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Waarom deze aanpak werkt
      </h1>
      <p className="mt-5 text-lg text-ink-soft">
        De academy en de trainingen zijn geen onderbuikgevoel. Ze rusten op
        onderzoek naar AI-geletterdheid en op de AI-verordening. Hieronder leg ik
        eerlijk uit wat AI-geletterdheid volgens dat onderzoek is, en welke vijf
        principes mijn aanpak sturen.
      </p>

      <div className="mt-10 space-y-4 text-ink-soft">
        <h2 className="hand text-2xl font-bold text-ink">Wat AI-geletterdheid is</h2>
        <p>
          Er is geen enkele officiële definitie, maar in het onderzoek is er wel
          een gedeelde kern. AI-geletterdheid is niet &ldquo;leren prompten&rdquo; en niet
          &ldquo;leren programmeren&rdquo;. Het is een combinatie van vier dingen:{" "}
          <strong className="text-ink">begrijpen</strong> hoe AI werkt,{" "}
          <strong className="text-ink">toepassen</strong> in je eigen werk,{" "}
          <strong className="text-ink">kritisch evalueren</strong> van wat eruit
          komt, en er <strong className="text-ink">verantwoord</strong> mee
          omgaan. Drie onafhankelijke overzichtsstudies komen op vrijwel dezelfde
          vier competenties uit. Voor generatieve AI komt daar nog bij: AI-content
          herkennen, en omgaan met hallucinaties en bias.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="hand text-2xl font-bold text-ink">Vijf principes</h2>
        <div className="mt-6 space-y-5">
          {principes.map((p, i) => (
            <div key={p.titel} className="warm-card p-6">
              <h3 className="font-bold text-ink">
                <span className="text-accent">{i + 1}.</span> {p.titel}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="warm-card mt-12 bg-sage-soft p-6">
        <h2 className="hand text-2xl font-bold text-ink">Aangesloten op erkende kaders</h2>
        <p className="mt-2 text-sm text-ink-soft">
          De aanpak sluit aan op de gezaghebbende frameworks en op de wet:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-soft">
          {kaders.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-xl border-2 border-line bg-card p-5 text-sm text-ink-soft">
        <p>
          <strong className="text-ink">Eerlijk gezegd:</strong> hard
          interventie-onderzoek specifiek bij werkenden is nog schaars. Een deel
          van deze principes is onderbouwd via aangrenzend onderzoek en
          praktijk. Het zijn dus goed onderbouwde principes, geen bewezen
          wetmatigheden. Die nuance hoort er wat mij betreft gewoon bij.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <a href="/academy" className="btn btn-primary">
          Bekijk de gratis academy
        </a>
        <Link href="/contact" className="btn btn-ghost">
          Maatwerk voor je organisatie
        </Link>
      </div>
    </section>
  );
}
