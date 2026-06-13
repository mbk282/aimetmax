import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Woordenlijst - AI Termen Uitgelegd in het Nederlands",
  description:
    "Doorzoekbaar woordenboek van AI-termen met heldere Nederlandse uitleg. Van LLM tot RAG, van fine-tuning tot hallucination. Gratis.",
  alternates: { canonical: "/tools/ai-woordenlijst" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
