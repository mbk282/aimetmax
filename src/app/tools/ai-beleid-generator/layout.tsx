import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-gebruiksbeleid generator - gratis startdocument",
  description:
    "Stel in een paar minuten een startversie van je AI-gebruiksbeleid op: welke tools, welke data niet, melden en verantwoordelijkheid. Gratis, in je browser, als basis voor de AI-geletterdheidsplicht.",
  alternates: { canonical: "/tools/ai-beleid-generator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
