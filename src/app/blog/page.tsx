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

      <div className="mt-12 divide-y divide-gray-100">
        {posts.length === 0 && (
          <p className="text-sm text-gray-400">Binnenkort verschijnen hier artikelen.</p>
        )}
        {posts.map((post) => (
          <article key={post.slug} className="group py-8 first:pt-0">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-gray-500 leading-relaxed">{post.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
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
