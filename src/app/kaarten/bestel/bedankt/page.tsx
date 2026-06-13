import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bedankt voor je bestelling",
  robots: { index: false },
};

export default function Bedankt() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="warm-card bg-sage-soft p-10">
        <h1 className="hand text-4xl font-bold text-ink">Bedankt, top!</h1>
        <p className="mt-3 text-ink-soft">
          Je bestelling is binnen. Je krijgt een bevestiging per e-mail. De set
          wordt met zorg gemaakt en verstuurd; je hoort het zodra hij onderweg
          is. Vragen? Mail gerust naar{" "}
          <a href="mailto:max@aimetmax.nl" className="font-semibold text-accent">
            max@aimetmax.nl
          </a>
          .
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/kaarten" className="btn btn-primary">
            Gebruik de kaarten nu al online
          </Link>
          <Link href="/academy" className="btn btn-ghost">
            Naar de gratis academy
          </Link>
        </div>
      </div>
    </section>
  );
}
