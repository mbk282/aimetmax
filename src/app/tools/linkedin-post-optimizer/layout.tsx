import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Post Optimizer - Verbeter je LinkedIn berichten",
  description:
    "Analyseer en verbeter je LinkedIn post. Krijg tips over lengte, hook, structuur en hashtags. Gratis, zonder account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
