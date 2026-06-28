import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pre-order de AI-gesprekskaarten",
  description:
    "Pre-order de fysieke set AI-gesprekskaarten met tijdelijk 2-voor-1 voorverkoopaanbod: 54 kaarten + 6 spelregelkaarten in een stevig doosje.",
  openGraph: {
    title: "AI-gesprekskaarten - pre-order de fysieke set",
    description:
      "Tijdelijk 2 voor de prijs van 1. Voor het goede gesprek over AI met je team.",
    images: ["/kaarten/doosje-voorkant.png"],
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
