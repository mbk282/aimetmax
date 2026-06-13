import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Act risicowijzer per use-case - welk risiconiveau heeft jouw AI?",
  description:
    "Zoek je concrete AI-toepassing op (werving, chatbot, Copilot, kredietbeoordeling) en zie meteen in welke risicocategorie van de EU AI-verordening die valt en wat dat betekent. Gratis.",
  alternates: { canonical: "/tools/ai-act-risicowijzer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
