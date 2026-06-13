import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON naar Markdown Converter - Gratis Online",
  description:
    "Converteer JSON bestanden naar leesbare Markdown. Gratis, direct in je browser. Perfect om gestructureerde data klaar te maken voor AI.",
  alternates: { canonical: "/tools/json-naar-markdown" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
