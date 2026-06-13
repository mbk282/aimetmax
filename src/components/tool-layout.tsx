import Link from "next/link";

export function ToolLayout({
  title,
  description,
  children,
  hideCta = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  hideCta?: boolean;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-ink-soft">{description}</p>
      <div className="mt-8">{children}</div>

      {!hideCta && (
        <div className="warm-card mt-12 bg-sage-soft p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <h2 className="hand text-xl font-bold text-ink">Meer dan een losse tool?</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Begin gratis met de academy, of laat een e-learning of training op
              maat maken voor je organisatie.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 sm:mt-0 sm:flex-none">
            <Link href="/academy" className="btn btn-primary">Gratis academy</Link>
            <Link href="/contact" className="btn btn-ghost">Maatwerk</Link>
          </div>
        </div>
      )}
      <p className="mt-6 text-sm">
        <Link href="/tools" className="font-medium text-accent hover:text-accent-dark">
          &larr; Alle gratis tools
        </Link>
      </p>
    </section>
  );
}
