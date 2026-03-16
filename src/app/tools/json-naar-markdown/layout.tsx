import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON naar Markdown Converter - Gratis Online",
  description:
    "Converteer JSON bestanden naar leesbare Markdown. Gratis, direct in je browser. Perfect om gestructureerde data klaar te maken voor AI.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
