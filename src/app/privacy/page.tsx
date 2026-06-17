import type { Metadata } from "next";
import { BEDRIJF, BEDRIJF_ADRES } from "@/lib/bedrijf";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe AI met Max (Max Impact) omgaat met je persoonsgegevens: welke gegevens, waarvoor, met wie gedeeld, hoe lang bewaard en jouw rechten.",
  alternates: { canonical: "/privacy" },
};

const bijgewerkt = "14 juni 2026";

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-ink-soft">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Privacyverklaring</h1>
      <p className="mt-3 text-sm">Laatst bijgewerkt: {bijgewerkt}</p>

      <div className="mt-8 space-y-6">
        <p>
          Deze website en de diensten erachter worden aangeboden door{" "}
          <strong>{BEDRIJF.handelsnaam}</strong> ({BEDRIJF.rechtsnaam}), gevestigd
          aan {BEDRIJF_ADRES}, KvK {BEDRIJF.kvk}. Ik ga zorgvuldig en zo zuinig
          mogelijk met je gegevens om. Hieronder lees je wat ik verzamel en waarom.
          Voor vragen of verzoeken mail je{" "}
          <a href={`mailto:${BEDRIJF.email}`} className="font-semibold text-accent hover:text-accent-dark">
            {BEDRIJF.email}
          </a>
          .
        </p>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Welke gegevens en waarvoor</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Nieuwsbrief en academy-updates:</strong> je e-mailadres (en
              optioneel je naam en je leerwens), om je de updates te sturen waar je
              je voor aanmeldt. Verwerkt via MailerLite, met dubbele opt-in.
            </li>
            <li>
              <strong>Certificaat eindtoets:</strong> als je een certificaat maakt,
              je naam en (optioneel) je e-mailadres en je score, om het certificaat
              te tonen en je desgewenst op de hoogte te houden.
            </li>
            <li>
              <strong>Bestelling van de gesprekskaarten:</strong> de gegevens die
              nodig zijn om je bestelling en factuur te verwerken en te bezorgen
              (naam, adres, e-mailadres, betaal- en bestelgegevens).
            </li>
            <li>
              <strong>Contact:</strong> als je mailt of een formulier invult, de
              gegevens die je daarin deelt, om je vraag te beantwoorden.
            </li>
            <li>
              <strong>Technische gegevens:</strong> de hostingprovider houdt
              standaard servergegevens bij (zoals IP-adres en tijdstip) voor
              beveiliging en goede werking van de site.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Cookies en tracking</h2>
          <p className="mt-3">
            Deze site gebruikt geen tracking- of advertentiecookies. De voortgang
            en quizscores in de academy worden alleen lokaal in je eigen browser
            bewaard (localStorage); die gegevens komen niet bij mij op een server
            terecht. Voor het tonen van lettertypen in de academy worden
            webfonts van Google geladen; daarbij kan je IP-adres aan Google worden
            doorgegeven.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Met wie ik gegevens deel</h2>
          <p className="mt-3">
            Ik verkoop je gegevens nooit. Ik schakel wel dienstverleners
            (verwerkers) in die gegevens namens mij verwerken:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Vercel</strong> - hosting van de website.</li>
            <li><strong>MailerLite</strong> - verzending en beheer van de nieuwsbrief.</li>
            <li><strong>Stripe</strong> - afhandeling van betalingen (bij een bestelling).</li>
            <li><strong>Google Fonts</strong> - lettertypen in de academy.</li>
          </ul>
          <p className="mt-3">
            Sommige van deze partijen kunnen gegevens (mede) buiten de EU
            verwerken (bijvoorbeeld in de VS); zij doen dat op basis van passende
            waarborgen zoals standaardcontractbepalingen. Verder deel ik gegevens
            alleen als dat wettelijk verplicht is.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Verwerkersovereenkomst (zakelijke klanten)</h2>
          <p className="mt-3">
            Verwerk ik bij een opdracht persoonsgegevens namens jouw organisatie
            (bijvoorbeeld bij een e-learning of training op maat), dan sluiten we
            een verwerkersovereenkomst. Je kunt mijn standaard verwerkersovereenkomst
            hier downloaden:{" "}
            <a
              href="/downloads/verwerkersovereenkomst-aimetmax.docx"
              className="font-semibold text-accent hover:text-accent-dark"
            >
              verwerkersovereenkomst (Word-document)
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Hoe lang ik bewaar</h2>
          <p className="mt-3">
            Niet langer dan nodig. Nieuwsbriefgegevens bewaar ik tot je je
            afmeldt; bestel- en factuurgegevens houd ik aan zolang de wettelijke
            (fiscale) bewaarplicht dat vereist; contactberichten zolang nodig om je
            te helpen.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Jouw rechten</h2>
          <p className="mt-3">
            Je hebt het recht om je gegevens in te zien, te corrigeren of te laten
            verwijderen, om bezwaar te maken, om de verwerking te beperken en om je
            gegevens over te laten dragen. Aanmelding voor de nieuwsbrief kun je
            altijd intrekken via de afmeldlink of door te mailen naar{" "}
            <a href={`mailto:${BEDRIJF.email}`} className="font-semibold text-accent hover:text-accent-dark">
              {BEDRIJF.email}
            </a>
            . Ben je het ergens niet mee eens, dan kun je een klacht indienen bij
            de Autoriteit Persoonsgegevens.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Wijzigingen</h2>
          <p className="mt-3">
            Ik kan deze verklaring aanpassen als de site of de dienstverlening
            verandert. De actuele versie staat altijd op deze pagina.
          </p>
        </div>
      </div>
    </section>
  );
}
