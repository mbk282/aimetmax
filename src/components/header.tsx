import Link from "next/link";

export function Header() {
  return (
    <header className="border-b-2 border-line bg-card">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="hand text-2xl font-bold text-ink">
          AI met Max
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <a href="/academy" className="font-medium text-ink-soft hover:text-accent">
            E-learnings
          </a>
          <Link href="/tools" className="font-medium text-ink-soft hover:text-accent">
            Gratis AI-tools
          </Link>
          <Link href="/blog" className="font-medium text-ink-soft hover:text-accent">
            Artikelen
          </Link>
          <Link href="/boek" className="font-medium text-ink-soft hover:text-accent">
            Boek
          </Link>
          <Link href="/over" className="font-medium text-ink-soft hover:text-accent">
            Over
          </Link>
          <Link href="/contact" className="btn btn-primary !px-4 !py-2 text-sm">
            Training aanvragen
          </Link>
        </div>
      </nav>
    </header>
  );
}
