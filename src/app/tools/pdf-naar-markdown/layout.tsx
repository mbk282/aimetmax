import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF naar Markdown Converter - Gratis Online",
  description:
    "Converteer PDF bestanden naar Markdown, gratis en direct in je browser. Geen upload naar een server, je data blijft privé.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
