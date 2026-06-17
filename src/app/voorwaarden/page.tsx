import type { Metadata } from "next";
import Link from "next/link";
import { BEDRIJF, BEDRIJF_ADRES } from "@/lib/bedrijf";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van AI met Max (Max Impact) voor trainingen, e-learnings, keynotes en de AI-gesprekskaarten.",
  alternates: { canonical: "/voorwaarden" },
};

const bijgewerkt = "14 juni 2026";

export default function VoorwaardenPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-ink-soft">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Algemene voorwaarden</h1>
      <p className="mt-3 text-sm">Laatst bijgewerkt: {bijgewerkt}</p>

      <div className="mt-8 space-y-6">
        <div>
          <h2 className="hand text-2xl font-bold text-ink">1. Wie en wat</h2>
          <p className="mt-3">
            Deze voorwaarden gelden voor alle aanbiedingen, opdrachten en leveringen
            van <strong>{BEDRIJF.handelsnaam}</strong> ({BEDRIJF.rechtsnaam}),
            gevestigd aan {BEDRIJF_ADRES}, KvK {BEDRIJF.kvk}, btw {BEDRIJF.btw}
            (&ldquo;ik&rdquo; of &ldquo;AI met Max&rdquo;). Het gaat om trainingen,
            workshops, keynotes, e-learnings op maat, advies en de verkoop van de
            AI-gesprekskaarten.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">2. Offertes en opdrachten</h2>
          <p className="mt-3">
            Offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld.
            Een overeenkomst komt tot stand zodra je een opdracht of bestelling
            schriftelijk (ook per e-mail) bevestigt of de bestelling op de site
            afrondt.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">3. Prijzen en betaling</h2>
          <p className="mt-3">
            Prijzen voor zakelijke diensten zijn exclusief btw; prijzen in de
            webshop zijn inclusief btw. Tenzij anders afgesproken geldt een
            betaaltermijn van 14 dagen na factuurdatum (voor overheidsopdrachten 30
            dagen). Bij niet-tijdige betaling mag ik de wettelijke (handels)rente en
            redelijke incassokosten in rekening brengen.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">4. Annulering en verzetten (diensten)</h2>
          <p className="mt-3">
            Een geplande training, workshop of keynote kun je kosteloos verzetten of
            annuleren tot 14 dagen voor de afgesproken datum. Bij annulering tussen
            14 en 7 dagen ervoor breng ik 50% van het afgesproken bedrag in rekening,
            en binnen 7 dagen ervoor 100%. Een afspraak in overleg verzetten naar een
            nieuwe datum kan in de meeste gevallen kosteloos.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">5. Levering</h2>
          <p className="mt-3">
            Diensten lever ik op de afgesproken data en in onderling overleg.
            Genoemde termijnen voor e-learnings op maat zijn een inspanning, geen
            harde fatale termijn, tenzij uitdrukkelijk anders afgesproken. Voor de
            levering en het retourneren van de gesprekskaarten geldt het{" "}
            <Link href="/retour" className="font-semibold text-accent hover:text-accent-dark">
              retour- en herroepingsbeleid
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">6. Intellectueel eigendom</h2>
          <p className="mt-3">
            Het materiaal dat ik maak (e-learnings, trainingsmateriaal,
            illustraties, de gesprekskaarten en de teksten op deze site) blijft mijn
            intellectueel eigendom. Bij een opdracht krijg je een gebruiksrecht voor
            het afgesproken doel binnen je eigen organisatie; verder verspreiden,
            doorverkopen of white-label aanbieden mag alleen met mijn schriftelijke
            toestemming. De gratis academy en de online gesprekskaarten mag je vrij
            gebruiken voor je eigen werk en team.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">7. Aansprakelijkheid</h2>
          <p className="mt-3">
            Ik lever mijn werk naar beste kunnen. AI-uitkomsten en adviezen blijven
            een hulpmiddel: je blijft zelf verantwoordelijk voor besluiten en voor
            het controleren van resultaten. Mijn aansprakelijkheid is beperkt tot het
            bedrag van de betreffende opdracht of bestelling, en ik ben niet
            aansprakelijk voor indirecte schade. Deze beperking geldt niet bij opzet
            of bewuste roekeloosheid.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">8. Overmacht</h2>
          <p className="mt-3">
            Bij overmacht (zoals ziekte) mag ik een afspraak verzetten; ik zoek dan
            samen met jou naar een nieuwe datum of een passende oplossing.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">9. Klachten en toepasselijk recht</h2>
          <p className="mt-3">
            Heb je een klacht? Mail me op{" "}
            <a href={`mailto:${BEDRIJF.email}`} className="font-semibold text-accent hover:text-accent-dark">
              {BEDRIJF.email}
            </a>{" "}
            en ik los het samen met je op. Op deze voorwaarden is Nederlands recht
            van toepassing.
          </p>
        </div>
      </div>
    </section>
  );
}
