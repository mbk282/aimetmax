import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Handtekening Generator - Gratis Professionele Signatures",
  description:
    "Maak gratis een professionele email handtekening. Kies een stijl, vul je gegevens in en kopieer de HTML. Direct klaar voor Outlook, Gmail en Apple Mail.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
