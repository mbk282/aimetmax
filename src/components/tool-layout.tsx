export function ToolLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="mt-3 text-gray-600">{description}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}
