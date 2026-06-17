import type { Metadata } from "next";
import { Inter, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  weight: ["500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI met Max - AI-trainer & auteur van AI-Pionier",
    template: "%s | AI met Max",
  },
  description:
    "Max van den Broek helpt organisaties met AI-geletterdheid: gratis e-learnings, maatwerk trainingen en handige AI-tools. Auteur van AI-Pionier, voormalig docent AI aan de UvA.",
  metadataBase: new URL("https://aimetmax.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "AI met Max",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} ${shantell.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
