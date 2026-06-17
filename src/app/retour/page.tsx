import type { Metadata } from "next";
import { BEDRIJF } from "@/lib/bedrijf";

export const metadata: Metadata = {
  title: "Retour & herroeping",
  description:
    "Retour- en herroepingsbeleid voor de AI-gesprekskaarten: 14 dagen bedenktijd, hoe je herroept en hoe terugbetaling werkt.",
  alternates: { canonical: "/retour" },
};

const bijgewerkt = "14 juni 2026";

export default function RetourPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-ink-soft">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">Retour &amp; herroeping</h1>
      <p className="mt-3 text-sm">Laatst bijgewerkt: {bijgewerkt}</p>

      <div className="mt-8 space-y-6">
        <p>
          Dit beleid geldt voor de aankoop van de fysieke AI-gesprekskaarten via
          deze website. De gratis online versie en de gratis e-learnings vallen er
          niet onder.
        </p>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">14 dagen bedenktijd</h2>
          <p className="mt-3">
            Koop je als consument, dan heb je 14 dagen bedenktijd vanaf het moment
            dat je de kaarten ontvangt. Binnen die termijn mag je de aankoop zonder
            opgaaf van reden herroepen. Je mag het product uitpakken en bekijken
            zoals je in een winkel zou doen; gebruik je het verder dan dat, dan kan
            een waardevermindering worden verrekend.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Hoe je herroept</h2>
          <p className="mt-3">
            Stuur binnen de bedenktijd een bericht naar{" "}
            <a href={`mailto:${BEDRIJF.email}`} className="font-semibold text-accent hover:text-accent-dark">
              {BEDRIJF.email}
            </a>{" "}
            dat je de aankoop wilt herroepen. Je hoeft geen reden te geven. Daarna
            stuur je de kaarten binnen 14 dagen terug. De kosten van de retourzending
            zijn voor jou, tenzij we iets anders afspreken.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Terugbetaling</h2>
          <p className="mt-3">
            Ik betaal het aankoopbedrag (inclusief de standaard verzendkosten van de
            heenzending) terug binnen 14 dagen nadat je de herroeping hebt gemeld. Ik
            mag wachten met terugbetalen tot ik de kaarten retour heb ontvangen of je
            hebt aangetoond dat je ze hebt teruggestuurd. Terugbetalen gebeurt met
            hetzelfde betaalmiddel als waarmee je betaalde.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Beschadigd of niet goed aangekomen</h2>
          <p className="mt-3">
            Is je bestelling beschadigd of klopt er iets niet? Mail me even, dan los
            ik het netjes op.
          </p>
        </div>

        <div>
          <h2 className="hand text-2xl font-bold text-ink">Zakelijke kopers</h2>
          <p className="mt-3">
            Het wettelijke herroepingsrecht geldt voor consumenten. Koop je zakelijk
            (als organisatie of overheid), dan geldt het niet automatisch, maar bij
            een fout of beschadiging lossen we het uiteraard samen op.
          </p>
        </div>
      </div>
    </section>
  );
}
