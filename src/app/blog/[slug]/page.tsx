import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

type Params = Promise<{ slug: string }>;

const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-4 text-2xl font-bold text-gray-900 border-b border-gray-100 pb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-gray-900" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 leading-7 text-gray-700" {...props} />
  ),
  ul: (props) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  a: (props) => (
    <a
      className="text-blue-600 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-600 transition-colors"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-4 border-l-4 border-blue-500 bg-blue-50 py-3 px-5 text-gray-700 italic rounded-r-lg"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  code: (props) => (
    <code
      className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
      {...props}
    />
  ),
};

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://aimetmax.nl/over",
    },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "AI met Max",
      url: "https://aimetmax.nl",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 transition-colors"
        >
          &larr; Alle artikelen
        </Link>

        <header className="mt-8">
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
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-gray-500 leading-relaxed">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
            <span>{post.author}</span>
            <span>&middot;</span>
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
          <hr className="mt-8 border-gray-200" />
        </header>

        <div className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-br from-blue-50 to-gray-50 p-8 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Hulp nodig bij AI-implementatie?
          </h3>
          <p className="mt-2 text-gray-600 leading-relaxed">
            Ik geef AI-trainingen, help bij het opstellen van AI-beleid en bouw
            prototypes. Van Copilot-trainingen tot strategisch advies.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Neem contact op
          </Link>
        </div>
      </article>
    </>
  );
}
