import Link from "next/link";

export function Footer() {
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
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-ink">Contact</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/contact" className="text-ink-soft hover:text-accent">
                  Training of offerte aanvragen
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
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t-2 border-line pt-8 text-center text-sm text-ink-soft">
          &copy; {new Date().getFullYear()} AI met Max &middot; Max van den Broek
        </div>
      </div>
    </footer>
  );
}
