import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI-gesprekskaarten - voer het goede gesprek over AI met je team",
  description:
    "Krijg op tafel wat er speelt rond AI in je team. 54 gesprekskaarten voor een teamoverleg, retro of training. Probeer ze gratis online of bestel het doosje.",
  openGraph: {
    title: "Krijg op tafel wat er speelt rond AI in je team",
    description:
      "Van enthousiasme tot twijfels: 54 gesprekskaarten om te bespreken wat AI met jullie werk doet. Voor een teamoverleg, retro of training. Gratis online, ook als doosje te bestellen.",
    url: "/kaarten",
    siteName: "AI met Max",
    locale: "nl_NL",
    images: [{ url: "/kaarten/fotos/kaarten-in-de-hand.jpeg", width: 1756, height: 2048, alt: "Praten over AI: de fysieke gesprekskaarten en het doosje" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krijg op tafel wat er speelt rond AI in je team",
    description:
      "54 gesprekskaarten om enthousiasme, twijfels en afspraken over AI te bespreken. Probeer ze gratis online of bestel het doosje.",
    images: ["/kaarten/fotos/kaarten-in-de-hand.jpeg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
