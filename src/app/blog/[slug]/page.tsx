import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href="/blog"
        className="text-sm text-gray-400 hover:text-gray-600"
      >
        &larr; Alle artikelen
      </Link>

      <header className="mt-6">
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
        <h1 className="mt-3 text-3xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-2 text-gray-500">{post.description}</p>
        <p className="mt-3 text-sm text-gray-400">
          {post.author} &middot;{" "}
          {new Date(post.date).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          &middot; {post.readingTime}
        </p>
      </header>

      <div className="prose prose-gray mt-10 max-w-none prose-headings:font-semibold prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-16 rounded-xl bg-gray-50 p-8">
        <h3 className="font-semibold text-gray-900">
          Hulp nodig bij AI-implementatie?
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Ik geef AI-trainingen, help bij het opstellen van AI-beleid en bouw
          prototypes. Van Copilot-trainingen tot strategisch advies.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Neem contact op
        </Link>
      </div>
    </article>
  );
}
