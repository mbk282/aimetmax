import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bestel Praten over AI",
  description:
    "Bestel Praten over AI: 54 gesprekskaarten, 10 jokers en een regelboekje van 8 pagina's in een stevig doosje. Op voorraad, snel in huis.",
  openGraph: {
    title: "Praten over AI - bestel de fysieke kaartenset",
    description:
      "Op voorraad. Voor het goede gesprek over AI met je team.",
    images: [{ url: "/kaarten/fotos/kaarten-in-de-hand.jpeg", width: 1756, height: 2048, alt: "Praten over AI: de fysieke gesprekskaarten en het doosje" }],
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
