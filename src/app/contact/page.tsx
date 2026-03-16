import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Max van den Broek voor AI-trainingen, keynotes of consulting.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
      <p className="mt-4 text-gray-600">
        Interesse in een AI-training, keynote of samenwerking? Laat je gegevens
        achter en ik neem contact met je op.
      </p>
      <div className="mt-10 space-y-6">
        <a
          href="mailto:max@aimetmax.nl?subject=Samenwerking%20AI"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Mail me: max@aimetmax.nl
        </a>
        <p className="text-sm text-gray-500">
          Of stuur een bericht via{" "}
          <a
            href="https://www.linkedin.com/in/maxbroek"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </section>
  );
}
