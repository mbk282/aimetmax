import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-mail Onderwerpregel Scorer - Test je onderwerpregel",
  description:
    "Score je e-mail onderwerpregel op effectiviteit. Krijg tips voor hogere open rates. Gratis, Nederlands.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
