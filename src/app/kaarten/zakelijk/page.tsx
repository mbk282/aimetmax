import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BESTEL, ZAKELIJK, berekenBestelling } from "../bestel-config";
import { BEDRIJF } from "@/lib/bedrijf";

export const metadata: Metadata = {
  title: "Praten over AI voor organisaties en als relatiegeschenk",
  description:
    "Gesprekskaarten over AI voor je teams, trainingen of als relatiegeschenk. Staffelkorting vanaf 10 sets, factuur op naam van je organisatie, gratis verzending in Nederland en België.",
  alternates: { canonical: "/kaarten/zakelijk" },
  openGraph: {
    title: "Praten over AI voor je teams of als relatiegeschenk",
    description:
      "54 gesprekskaarten, 10 jokers en een boekje met werkvormen. Staffelkorting vanaf 10 sets en een factuur op naam van je organisatie.",
    url: "/kaarten/zakelijk",
    siteName: "AI met Max",
    locale: "nl_NL",
    images: [{ url: "/kaarten/fotos/doosjes.jpeg", width: 2048, height: 1824, alt: "De doosjes Praten over AI" }],
    type: "website",
  },
};

const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: BESTEL.valuta });

const toepassingen = [
  {
    titel: "Teams en afdelingen",
    tekst:
      "Eén doosje per team voor het teamoverleg, een retro of een heidag. Pak een handvol kaarten en plan 45 tot 90 minuten.",
  },
  {
    titel: "L&D en trainers",
    tekst:
      "Een werkvorm die je in elke AI-training of leergang kunt inzetten. Met een set per groep praten deelnemers tegelijk aan verschillende tafels.",
  },
  {
    titel: "Relatiegeschenk",
    tekst:
      "Voor klanten en partners die zelf met AI aan de slag zijn. Een doosje dat op tafel komt in plaats van in een la.",
  },
  {
    titel: "Eindejaarsbijeenkomst",
    tekst:
      "Terugkijken op een jaar waarin AI het werk veranderde, en bespreken wat je volgend jaar anders wilt. Zonder dat het een cursus wordt.",
  },
];

function offerteMail() {
  const subject = `Offerte of bestelling ${BESTEL.naam} voor onze organisatie`;
  const body = [
    "Hoi Max,",
    "",
    `We willen graag ${BESTEL.naam} bestellen voor onze organisatie.`,
    "",
    "- Aantal sets: ",
    "- Gewenste leverdatum: ",
    "- Organisatie: ",
    "- Contactpersoon: ",
    "- Factuuradres: ",
    "- E-mail voor de factuur: ",
    "- Inkoopordernummer (PO), indien van toepassing: ",
    "- Afleveradres (indien anders dan factuuradres): ",
    "- Vragen of opmerkingen: ",
    "",
    "Groet,",
  ].join("\n");
  return `mailto:${BEDRIJF.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ZakelijkPage() {
  const staffels = [...BESTEL.bulkStaffels].sort((a, b) => a.vanaf - b.vanaf);
  const rijen = [
    { label: `1 tot ${staffels[0].vanaf - 1} sets`, korting: 0, vanaf: 1 },
    ...staffels.map((s, i) => {
      const volgende = staffels[i + 1];
      return {
        label: volgende ? `${s.vanaf} tot ${volgende.vanaf - 1} sets` : `${s.vanaf} sets of meer`,
        korting: s.korting,
        vanaf: s.vanaf,
      };
    }),
  ].map((rij) => ({ ...rij, perSet: berekenBestelling(rij.vanaf).prijsPerSet }));
  const voorbeelden = ZAKELIJK.voorbeeldAantallen
    .filter((n) => n > 1)
    .map((n) => ({ aantal: n, totaal: berekenBestelling(n).totaal }));
  const mailto = offerteMail();

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      <section className="mx-auto max-w-5xl px-5 pt-10 pb-6 sm:px-6 sm:pt-14">
        <Link href="/kaarten" className="text-sm text-ink-soft underline-offset-4 hover:underline">
          &larr; {BESTEL.naam}
        </Link>
        <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <span className="inline-block rounded-full border-2 border-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Voor organisaties
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {BESTEL.naam} voor je teams of als relatiegeschenk
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Een doosje met 54 gesprekskaarten, 10 jokers en een boekje met
              werkvormen. Leg het op tafel en het gesprek over AI gaat over jullie
              eigen werk: wat mag, wat werkt, en waar mensen mee zitten. Je hoeft
              geen AI-expert te zijn om het te begeleiden.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mailto} className="btn btn-primary">
                Vraag een offerte of bestel op factuur
              </a>
              <Link href="/kaarten/bestel" className="btn btn-ghost">
                Direct online bestellen
              </Link>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Staffelkorting vanaf 10 sets. Gratis verzending in {BESTEL.verzendregio}.
            </p>
          </div>
          <Image
            src="/kaarten/fotos/doosjes.jpeg"
            alt="De doosjes Praten over AI, met de voorkant en zijkant zichtbaar"
            width={2048}
            height={1824}
            sizes="(max-width: 767px) 100vw, 420px"
            className="h-auto w-full rounded-2xl"
            priority
          />
        </div>
      </section>

      {/* -------------------------------------------------- TOEPASSINGEN */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
        <h2 className="hand text-3xl font-bold text-ink">Waar organisaties het voor gebruiken</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {toepassingen.map((t) => (
            <div key={t.titel} className="warm-card p-5">
              <h3 className="hand text-xl font-bold text-accent">{t.titel}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.tekst}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- PRIJS */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
        <h2 className="hand text-3xl font-bold text-ink">Prijs per aantal</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          De korting wordt online automatisch verrekend en geldt ook als je op
          factuur bestelt. Alle prijzen zijn inclusief 21% btw en gratis
          verzending in {BESTEL.verzendregio}.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-sage-soft text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Aantal</th>
                <th scope="col" className="px-4 py-3 font-semibold">Korting</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Per set</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-card text-ink-soft">
              {rijen.map((rij) => (
                <tr key={rij.label}>
                  <td className="px-4 py-3 text-ink">{rij.label}</td>
                  <td className="px-4 py-3">{rij.korting ? `${Math.round(rij.korting * 100)}%` : "-"}</td>
                  <td className="px-4 py-3 text-right font-semibold text-ink">{euro.format(rij.perSet)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Bijvoorbeeld:{" "}
          {voorbeelden.map((v, i) => (
            <span key={v.aantal}>
              {v.aantal} sets {euro.format(v.totaal)}
              {i < voorbeelden.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </section>

      {/* ---------------------------------------------- LEVERING/FACTUUR */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="warm-card p-6">
            <h2 className="hand text-2xl font-bold text-ink">Levering</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
              <li>{BESTEL.levertijd}</li>
              <li>Grotere aantallen of een vaste leverdatum? Zet het in je mail, dan stemmen we het af.</li>
              <li>Levering op één adres in {BESTEL.verzendregio}. Naar meerdere adressen kan in overleg.</li>
            </ul>
            {ZAKELIJK.feestdagenMelding && (
              <p className="mt-4 rounded-xl bg-accent-soft p-3 text-sm text-ink">
                {ZAKELIJK.feestdagenMelding}
              </p>
            )}
          </div>
          <div className="warm-card p-6">
            <h2 className="hand text-2xl font-bold text-ink">Factuur op naam</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
              <li>Een factuur op naam van je organisatie, met de btw apart vermeld.</li>
              <li>Met je inkoopordernummer (PO) erop als je dat hebt.</li>
              <li>
                Geleverd door {BEDRIJF.rechtsnaam} ({BEDRIJF.handelsnaam}), KvK {BEDRIJF.kvk}.
              </li>
            </ul>
            <a href={mailto} className="btn btn-primary mt-5">
              Mail je aanvraag
            </a>
            <p className="mt-3 text-xs text-ink-soft">
              Opent je mailprogramma met een kort lijstje om in te vullen. Of mail
              direct naar <a href={`mailto:${BEDRIJF.email}`} className="underline">{BEDRIJF.email}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- INHOUD */}
      <section className="mx-auto max-w-5xl px-5 py-8 pb-14 sm:px-6">
        <div className="warm-card bg-sage-soft p-6 sm:p-8">
          <h2 className="hand text-2xl font-bold text-ink">Wat er in het doosje zit</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
            {BESTEL.inhoud.map((regel) => (
              <li key={regel}>{regel}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">
            Eerst zelf kijken welke vragen erin staan?{" "}
            <Link href="/kaarten#deck" className="font-medium text-ink underline underline-offset-4">
              Bekijk de kaarten gratis online
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
