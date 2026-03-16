import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Artikelen over AI-strategie en implementatie",
  description:
    "Praktische artikelen over AI-beleid, AI-ready data, en AI-implementatie voor Nederlandse organisaties. Door Max van den Broek.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold text-gray-900">Artikelen</h1>
      <p className="mt-4 text-gray-600">
        Praktische artikelen over AI-strategie, tools en implementatie voor
        Nederlandse organisaties.
      </p>

      <div className="mt-12 space-y-8">
        {posts.length === 0 && (
          <p className="text-sm text-gray-400">Binnenkort verschijnen hier artikelen.</p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="mt-1 text-gray-500">{post.description}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(post.date).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                &middot; {post.readingTime}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
