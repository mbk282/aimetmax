import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://aimetmax.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/over",
    "/blog",
    "/boek",
    "/contact",
    "/tools",
    "/resources/ai-geletterdheid",
    "/tools/prompt-checker",
    "/tools/ai-act-checker",
    "/tools/ai-roi-calculator",
    "/tools/copilot-roi-calculator",
    "/tools/vergaderkosten-calculator",
    "/tools/leesbaarheid-checker",
    "/tools/ai-woordenlijst",
    "/tools/linkedin-post-optimizer",
    "/tools/email-onderwerp-scorer",
    "/tools/vacaturetekst-checker",
    "/tools/email-handtekening-generator",
    "/tools/pdf-naar-markdown",
    "/tools/word-naar-markdown",
    "/tools/html-naar-markdown",
    "/tools/csv-naar-markdown",
    "/tools/json-naar-markdown",
    "/tools/xml-naar-markdown",
    "/tools/rtf-naar-markdown",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/tools") ? 0.7 : 0.8,
  }));

  const posts = getAllPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
