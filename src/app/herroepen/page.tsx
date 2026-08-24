import type { Metadata } from "next";
import Link from "next/link";
import { HerroepClient } from "./HerroepClient";

export const metadata: Metadata = {
  title: "Hier de overeenkomst ontbinden",
  description:
    "Dien online een herroeping in voor je bestelling van de AI-gesprekskaarten en download direct de ontvangstbevestiging.",
  alternates: { canonical: "/herroepen" },
};

export default function HerroepenPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-ink-soft">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent">
        Herroepingsfunctie
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Hier de overeenkomst ontbinden
      </h1>
      <p className="mt-4 max-w-2xl">
        Kocht je de fysieke AI-gesprekskaarten als consument? Dan kun je de
        overeenkomst binnen de wettelijke bedenktijd van 14 dagen zonder reden
        herroepen. De bedenktijd begint op de dag nadat je de bestelling hebt
        ontvangen.
      </p>
      <p className="mt-3 max-w-2xl">
        Vul de gegevens uit je bestelbevestiging in. Na verzending registreer ik
        de verklaring bij je Stripe-bestelling en kun je direct een
        ontvangstbevestiging downloaden.
      </p>

      <HerroepClient />

      <div className="mt-8 rounded-xl border-2 border-line bg-card p-5 text-sm">
        <p>
          Liever het modelformulier gebruiken? Download het{" "}
          <a
            href="/downloads/modelformulier-herroeping.txt"
            className="font-semibold text-accent underline"
          >
            modelformulier voor herroeping
          </a>{" "}
          en mail het ingevuld naar max@aimetmax.nl.
        </p>
        <p className="mt-2">
          Meer informatie over retour sturen en terugbetaling staat in het{" "}
          <Link href="/retour" className="font-semibold text-accent underline">
            retour- en herroepingsbeleid
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
