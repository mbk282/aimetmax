import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI-gesprekskaarten - voer het goede gesprek over AI met je team",
  description:
    "54 gratis gesprekskaarten met stellingen, dilemma's en open vragen om het goede gesprek over AI op de werkvloer te voeren. Direct online te gebruiken, met facilitator-notes en een presenteermodus. Van AI met Max.",
  openGraph: {
    title: "AI-gesprekskaarten - het goede gesprek over AI",
    description:
      "Gratis stellingen, dilemma's en open vragen voor teamsessies over AI. Online te gebruiken, fysiek te koop. Van AI met Max.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
