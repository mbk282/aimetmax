import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML naar Markdown Converter - Gratis Online",
  description:
    "Converteer HTML naar Markdown. Plak HTML of een URL en krijg schone Markdown terug. Gratis, zonder account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
