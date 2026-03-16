import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-gray-900">AI met Max</h3>
            <p className="mt-2 text-sm text-gray-600">
              AI-expert Max van den Broek helpt organisaties met trainingen,
              consulting en praktische AI-tools.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Pagina&apos;s</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/tools" className="text-gray-600 hover:text-gray-900">
                  Gratis AI-tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Artikelen
                </Link>
              </li>
              <li>
                <Link href="/boek" className="text-gray-600 hover:text-gray-900">
                  Boek
                </Link>
              </li>
              <li>
                <Link href="/over" className="text-gray-600 hover:text-gray-900">
                  Over Max
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Contact</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Vraag een offerte aan
                </Link>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/maxbroek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI met Max. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
