import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacaturetekst Inclusiviteit Checker - Gratis",
  description:
    "Check je vacaturetekst op inclusiviteit. Ontdek genderbias, leeftijdsbias en onnodige eisen. Gratis, direct resultaat.",
  alternates: { canonical: "/tools/vacaturetekst-checker" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
