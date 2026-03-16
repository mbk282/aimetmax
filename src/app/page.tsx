import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-col-reverse items-start gap-10 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              AI werkend krijgen in jouw organisatie
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Ik ben Max van den Broek, AI-expert. Ik geef trainingen, bouw
              prototypes en help teams om AI echt te gaan gebruiken. Van
              Copilot-training tot AI-strategie.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/contact"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
              >
                Neem contact op
              </Link>
              <Link
                href="/tools"
                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Bekijk gratis AI-tools
              </Link>
            </div>
          </div>
          <Image
            src="/max-van-den-broek.jpg"
            alt="Max van den Broek"
            width={280}
            height={280}
            className="shrink-0 rounded-2xl object-cover"
            priority
          />
        </div>
      </section>

      {/* Wat ik doe */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-gray-900">Wat ik doe</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">AI-trainingen</h3>
              <p className="mt-2 text-sm text-gray-600">
                Doelgroepgerichte trainingen, van Copilot voor controllers tot
                AI voor developers. Deelnemers oefenen direct zelf.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Prototypes &amp; POCs
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Ik bouw werkende prototypes en simpele AI-tools zodat je snel
                kunt zien wat AI voor jouw team kan betekenen.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">
                Keynotes &amp; lezingen
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Inspirerende presentaties over AI, praktisch en toegankelijk.
                Voor conferenties, bedrijfsdagen en teambijeenkomsten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gratis tools teaser */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Gratis AI-tools
          </h2>
          <p className="mt-2 text-gray-600">
            Probeer deze AI-tools gratis uit, direct in je browser.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Converters</h3>
              <p className="mt-1 text-sm text-gray-500">
                PDF, Word, HTML, CSV, JSON en XML naar Markdown. Privé in je browser.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Checkers</h3>
              <p className="mt-1 text-sm text-gray-500">
                EU AI Act, leesbaarheid, prompts, vacatureteksten en meer.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900">Calculators</h3>
              <p className="mt-1 text-sm text-gray-500">
                ROI berekenen voor AI en Copilot. Vergaderkosten teller.
              </p>
            </div>
          </div>
          <Link
            href="/tools"
            className="mt-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Bekijk alle tools &rarr;
          </Link>
        </div>
      </section>

      {/* Boek */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900">
              Boek: AI-Pionier
            </h2>
            <p className="mt-4 text-gray-600">
              Hoe jij ook begint met generatieve AI. Met 25+ praktijkvoorbeelden
              en antwoorden op de meestgestelde bezwaren.
            </p>
            <Link
              href="/boek"
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Meer over het boek &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
