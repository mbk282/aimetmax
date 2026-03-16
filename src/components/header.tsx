import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-100">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          AI met Max
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/tools" className="text-gray-600 hover:text-gray-900">
            Gratis AI-tools
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            Artikelen
          </Link>
          <Link href="/boek" className="text-gray-600 hover:text-gray-900">
            Boek
          </Link>
          <Link href="/over" className="text-gray-600 hover:text-gray-900">
            Over
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
