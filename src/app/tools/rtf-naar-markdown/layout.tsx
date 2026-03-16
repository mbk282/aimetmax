import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RTF naar Markdown Converter - Gratis Online",
  description:
    "Converteer RTF (Rich Text Format) bestanden naar Markdown. Gratis, direct in je browser. Privacy-vriendelijk, geen upload naar servers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
