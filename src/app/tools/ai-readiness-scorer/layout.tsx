import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document AI-readiness Checker - is jouw document AI-proof?",
  description:
    "Check gratis hoe goed je document te gebruiken is door AI: Copilot, SharePoint-agents, chatbots en RAG. Krijg een score en concrete verbeterpunten. Alles in je browser, je bestand wordt niet geupload.",
  alternates: { canonical: "/tools/ai-readiness-scorer" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
