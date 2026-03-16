import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EU AI Act Risicoclassificatie Tool - Gratis Check",
  description:
    "Check in welke risicocategorie jouw AI-toepassing valt volgens de EU AI Act. Gratis interactieve tool met concrete actiepunten.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
