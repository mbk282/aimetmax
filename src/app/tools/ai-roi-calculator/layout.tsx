import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI ROI Calculator - Bereken je AI-besparing",
  description:
    "Gratis AI ROI Calculator. Bereken hoeveel jouw organisatie kan besparen met AI. Direct resultaat, geen account nodig.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
