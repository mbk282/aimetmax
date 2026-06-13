import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bestel de AI-gesprekskaarten (fysieke set)",
  description:
    "Bestel de fysieke set AI-gesprekskaarten: 54 kaarten + 6 spelregelkaarten in een stevig doosje, voor teamsessies en workshops. Van AI met Max.",
  openGraph: {
    title: "AI-gesprekskaarten - de fysieke set",
    description:
      "54 gesprekskaarten + 6 spelregelkaarten in de huisstijl. Voor het goede gesprek over AI met je team.",
    images: ["/kaarten/doosje.png"],
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
