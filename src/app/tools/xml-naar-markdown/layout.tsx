import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML naar Markdown Converter - Gratis Online",
  description:
    "Converteer XML bestanden naar leesbare Markdown. Gratis, direct in je browser. Ideaal voor documentatie en AI-voorbereiding.",
  alternates: { canonical: "/tools/xml-naar-markdown" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
