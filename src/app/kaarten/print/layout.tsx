import type { Metadata } from "next";

// De printweergave is grotendeels dezelfde inhoud als /kaarten. Niet zelfstandig
// laten indexeren (duplicate content) en canonical naar de hoofdpagina.
export const metadata: Metadata = {
  title: "AI-gesprekskaarten - printversie",
  robots: { index: false, follow: true },
  alternates: { canonical: "/kaarten" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
