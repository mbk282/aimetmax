import type { Metadata } from "next";
import { Alfa_Slab_One, IBM_Plex_Mono } from "next/font/google";
import "./sj.css";
import Charts from "./charts-client";
import { ARTICLE_HTML } from "./article-html";
import data from "./data.json";

const alfa = Alfa_Slab_One({ weight: "400", subsets: ["latin"], variable: "--font-alfa" });
const plex = IBM_Plex_Mono({ weight: ["400", "600"], subsets: ["latin"], variable: "--font-plex-mono" });

const TITLE = "Is het Sinterklaasjournaal enger geworden?";
const DESCRIPTION =
  "Data-onderzoek naar 26 seizoenen verhaallijnen en 200 uitzendingen van het Sinterklaasjournaal: het wordt langzaam spannender, en vroeger ging het mis door een gekke piet, nu door een echte ramp.";
const PUBLISHED = "2026-11-15";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | AI met Max` },
  description: DESCRIPTION,
  alternates: { canonical: "/onderzoek/sinterklaasjournaal" },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: "/onderzoek/sinterklaasjournaal",
    publishedTime: PUBLISHED,
    authors: ["Max van den Broek"],
    images: [{ url: "/onderzoek/sinterklaasjournaal/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/onderzoek/sinterklaasjournaal/og.jpg"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  author: { "@type": "Person", name: "Max van den Broek", url: "https://aimetmax.nl/over" },
  publisher: { "@type": "Organization", name: "AI met Max", url: "https://aimetmax.nl" },
  image: "https://aimetmax.nl/onderzoek/sinterklaasjournaal/og.jpg",
  mainEntityOfPage: "https://aimetmax.nl/onderzoek/sinterklaasjournaal",
};

export default function SinterklaasjournaalPage() {
  return (
    <div className={`sj ${alfa.variable} ${plex.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }} />
      <Charts data={data} />
    </div>
  );
}
