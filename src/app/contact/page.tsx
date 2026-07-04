import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Max van den Broek voor trainingen, keynotes, AI-prototypes of een werksessie met de AI-gesprekskaarten.",
  alternates: { canonical: "/contact" },
};

const mailLink =
  "mailto:max@aimetmax.nl?subject=" +
  encodeURIComponent("Contact via aimetmax.nl");

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">
        Contact
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
        Samenwerken of iets vragen?
      </h1>
      <p className="mt-5 text-lg text-ink-soft">
        Leuk. Mail me of stuur een bericht op LinkedIn. Mijn agenda zit op dit
        moment goed vol, dus voor grotere trajecten denk ik graag mee over een
        moment later dit jaar.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href={mailLink} className="btn btn-primary">
          Mail max@aimetmax.nl
        </a>
        <a
          href="https://www.linkedin.com/in/maxbroek"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Stuur een bericht op LinkedIn
        </a>
      </div>

      <div className="warm-card mt-12 p-8">
        <h2 className="hand text-2xl font-bold text-ink">
          Waar je me voor kunt vragen
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-soft">
          <li>Trainingen, workshops en keynotes over (generatieve) AI.</li>
          <li>AI-toepassingen en prototypes bouwen.</li>
          <li>
            Een werksessie met de{" "}
            <Link
              href="/kaarten"
              className="font-semibold text-accent hover:text-accent-dark"
            >
              AI-gesprekskaarten
            </Link>
            : het goede gesprek over AI in je team.
          </li>
          <li>Vragen over het boek, de e-learning of de kaarten.</li>
        </ul>
      </div>

      <p className="mt-10 text-ink-soft">
        Eerst kijken hoe ik werk? Bekijk de{" "}
        <a
          href="/academy"
          className="font-semibold text-accent hover:text-accent-dark"
        >
          gratis e-learnings
        </a>{" "}
        of lees over{" "}
        <Link
          href="/methode"
          className="font-semibold text-accent hover:text-accent-dark"
        >
          mijn methode
        </Link>
        .
      </p>
    </section>
  );
}
