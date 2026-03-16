import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI met Max - AI Expert & Trainer",
    template: "%s | AI met Max",
  },
  description:
    "AI-expert Max van den Broek helpt organisaties met AI-trainingen, consulting en gratis AI-tools. Auteur van AI-Pionier.",
  metadataBase: new URL("https://aimetmax.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "AI met Max",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
