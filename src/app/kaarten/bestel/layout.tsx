import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bestel de AI-gesprekskaarten",
  description:
    "Bestel de fysieke set AI-gesprekskaarten: 54 gesprekskaarten, 6 spelregelkaarten en 4 jokers in een stevig doosje. Op voorraad, snel in huis.",
  openGraph: {
    title: "AI-gesprekskaarten - bestel de fysieke set",
    description:
      "Op voorraad. Voor het goede gesprek over AI met je team.",
    images: ["/kaarten/doosje-voorkant.png"],
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
