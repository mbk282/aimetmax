import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML naar Markdown Converter - Gratis Online",
  description:
    "Converteer HTML naar Markdown. Plak je HTML en krijg schone Markdown terug. Gratis, zonder account.",
  alternates: { canonical: "/tools/html-naar-markdown" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
