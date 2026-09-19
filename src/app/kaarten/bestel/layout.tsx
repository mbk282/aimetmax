import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bestel Praten over AI",
  description:
    "Krijg op tafel wat er speelt rond AI in je team. Praten over AI: 54 gesprekskaarten, 10 jokers en een boekje met werkvormen en begeleidingstips. Je hoeft geen AI-expert te zijn.",
  openGraph: {
    title: "Krijg op tafel wat er speelt rond AI in je team",
    description:
      "Van enthousiasme tot twijfels: 54 gesprekskaarten om te bespreken wat AI met jullie werk doet. Met 10 jokers en een boekje met werkvormen. Je hoeft geen AI-expert te zijn.",
    url: "/kaarten/bestel",
    siteName: "AI met Max",
    locale: "nl_NL",
    images: [{ url: "/kaarten/fotos/kaarten-in-de-hand.jpeg", width: 1756, height: 2048, alt: "Praten over AI: de fysieke gesprekskaarten en het doosje" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krijg op tafel wat er speelt rond AI in je team",
    description:
      "54 gesprekskaarten, 10 jokers en een boekje met werkvormen. Voor een teamoverleg, retro of training over AI. Je hoeft geen AI-expert te zijn.",
    images: ["/kaarten/fotos/kaarten-in-de-hand.jpeg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
