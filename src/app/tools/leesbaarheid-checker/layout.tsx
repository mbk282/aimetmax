import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nederlandse Leesbaarheid Checker - Gratis Flesch-Douma Score",
  description:
    "Check het taalniveau van je Nederlandse tekst. Flesch-Douma score, B1/B2/C1 niveau, en tips om leesbaarder te schrijven. Gratis.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
