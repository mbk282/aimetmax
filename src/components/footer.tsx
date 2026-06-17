import Link from "next/link";
import { BEDRIJF } from "@/lib/bedrijf";

export function Footer() {
  const adresDeel = BEDRIJF.toonAdresInFooter
    ? `${BEDRIJF.straat}, ${BEDRIJF.postcode} ${BEDRIJF.plaats}`
    : BEDRIJF.plaats;
  return (
    <footer className="border-t-2 border-line bg-card">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="hand text-2xl font-bold text-ink">AI met Max</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Max van den Broek helpt organisaties met AI-trainingen,
              e-learnings op maat en praktische AI-tools. Auteur van AI-Pionier.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-ink">Pagina&apos;s</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a href="/academy" className="text-ink-soft hover:text-accent">
                  Gratis e-learnings
                </a>
              </li>
              <li>
                <Link href="/tools" className="text-ink-soft hover:text-accent">
                  Gratis AI-tools
                </Link>
              </li>
              <li>
                <Link
                  href="/kaarten"
                  className="text-ink-soft hover:text-accent"
                >
                  AI-gesprekskaarten
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-ink-soft hover:text-accent">
                  Artikelen
                </Link>
              </li>
              <li>
                <Link href="/boek" className="text-ink-soft hover:text-accent">
                  Boek
                </Link>
              </li>
              <li>
                <Link href="/over" className="text-ink-soft hover:text-accent">
                  Over Max
                </Link>
              </li>
              <li>
                <Link href="/methode" className="text-ink-soft hover:text-accent">
                  Onze methode
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ink">Contact</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/contact" className="text-ink-soft hover:text-accent">
                  AI-geletterdheid voor je organisatie
                </Link>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/maxbroek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft hover:text-accent"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BEDRIJF.email}`}
                  className="text-ink-soft hover:text-accent"
                >
                  {BEDRIJF.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t-2 border-line pt-8 text-sm text-ink-soft">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="hover:text-accent">
              Algemene voorwaarden
            </Link>
            <Link href="/retour" className="hover:text-accent">
              Retour &amp; herroeping
            </Link>
          </div>
          <p className="mt-4 text-center">
            {BEDRIJF.handelsnaam} &middot; {BEDRIJF.rechtsnaam} &middot; {adresDeel}{" "}
            &middot; KvK {BEDRIJF.kvk} &middot; btw {BEDRIJF.btw}
          </p>
          <p className="mt-1 text-center">
            &copy; {new Date().getFullYear()} {BEDRIJF.eigenaar}
          </p>
        </div>
      </div>
    </footer>
  );
}
