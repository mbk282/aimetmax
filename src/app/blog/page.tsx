import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Artikelen over AI-strategie en implementatie",
  description:
    "Praktische artikelen over AI-beleid, AI-ready data, en AI-implementatie voor Nederlandse organisaties. Door Max van den Broek.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Artikelen</h1>
      <p className="mt-4 text-ink-soft">
        Praktische artikelen over AI-geletterdheid, tools en implementatie voor
        Nederlandse organisaties.
      </p>

      <div className="mt-12 divide-y divide-line">
        {posts.length === 0 && (
          <p className="text-sm text-ink-soft">Binnenkort verschijnen hier artikelen.</p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="group py-8 first:pt-0">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sage bg-sage-soft px-3 py-1 text-xs font-medium text-sage"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{post.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
