import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Statische academy (public/academy, gebruikt absolute paden) op een nette URL
      { source: "/academy", destination: "/academy/index.html" },
    ];
  },
  async redirects() {
    return [
      // WordPress oude URLs naar nieuwe equivalenten
      { source: "/mijn-diensten", destination: "/", permanent: true },
      { source: "/mijn-diensten/", destination: "/", permanent: true },
      { source: "/gratis-e-mailcursus", destination: "/contact", permanent: true },
      { source: "/gratis-e-mailcursus/", destination: "/contact", permanent: true },
      { source: "/bedankt", destination: "/", permanent: true },
      { source: "/bedankt/", destination: "/", permanent: true },
      // Oude WordPress-URLs zonder huidig equivalent: naar dichtstbijzijnde relevante pagina (geen 404)
      {
        source: "/gratis-custom-gpts-van-ai-pionier",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/gratis-custom-gpts-van-ai-pionier/",
        destination: "/academy",
        permanent: true,
      },
      {
        source: "/merkbekendheid-nps-schatten-ai",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/merkbekendheid-nps-schatten-ai/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
