import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WordPress oude URLs naar nieuwe equivalenten
      { source: "/mijn-diensten", destination: "/", permanent: true },
      { source: "/mijn-diensten/", destination: "/", permanent: true },
      { source: "/gratis-e-mailcursus", destination: "/contact", permanent: true },
      { source: "/gratis-e-mailcursus/", destination: "/contact", permanent: true },
      { source: "/bedankt", destination: "/", permanent: true },
      { source: "/bedankt/", destination: "/", permanent: true },
      {
        source: "/gratis-custom-gpts-van-ai-pionier",
        destination: "/blog/custom-gpts-ai-pionier",
        permanent: true,
      },
      {
        source: "/gratis-custom-gpts-van-ai-pionier/",
        destination: "/blog/custom-gpts-ai-pionier",
        permanent: true,
      },
      {
        source: "/merkbekendheid-nps-schatten-ai",
        destination: "/blog/merkbekendheid-nps-schatten-ai",
        permanent: true,
      },
      {
        source: "/merkbekendheid-nps-schatten-ai/",
        destination: "/blog/merkbekendheid-nps-schatten-ai",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
