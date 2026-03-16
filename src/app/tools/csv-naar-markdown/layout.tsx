import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV naar Markdown Tabel Converter - Gratis Online",
  description:
    "Converteer CSV bestanden naar nette Markdown tabellen. Gratis, direct in je browser. Perfect om data klaar te maken voor AI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
