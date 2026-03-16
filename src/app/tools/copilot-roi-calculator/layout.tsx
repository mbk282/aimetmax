import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microsoft Copilot ROI Calculator - Gratis",
  description:
    "Bereken de ROI van Microsoft Copilot voor jouw organisatie. Kosten vs. besparing per medewerker. Gratis calculator.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
