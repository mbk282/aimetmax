import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word naar Markdown Converter - Gratis Online",
  description:
    "Converteer Word (.docx) bestanden naar Markdown. Gratis, direct in je browser. Je data blijft privé.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
