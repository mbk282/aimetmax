import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PostHog posts to /ingest/e/ etc. with a trailing slash
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      // PostHog (EU) via first-party /ingest, so ad blockers don't drop it
      { source: "/ingest/static/:path*", destination: "https://eu-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/array/:path*", destination: "https://eu-assets.i.posthog.com/array/:path*" },
      { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
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
      // Keep the normal trailing-slash redirect for everything except PostHog's /ingest (skipTrailingSlashRedirect)
      { source: "/:path((?!ingest/).+)/", destination: "/:path", permanent: true },
    ];
  },
};

export default nextConfig;
