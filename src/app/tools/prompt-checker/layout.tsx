import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Kwaliteit Checker - Verbeter je AI prompts",
  description:
    "Check de kwaliteit van je ChatGPT of Copilot prompt. Krijg een score en concrete tips om betere resultaten te krijgen. Gratis.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
