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
      className="mt-10 mb-4 border-b border-line pb-2 text-2xl font-bold text-ink"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-ink" {...props} />
  ),
  p: (props) => <p className="mb-4 leading-7 text-ink-soft" {...props} />,
  ul: (props) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-ink-soft" {...props} />
  ),
  ol: (props) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-ink-soft" {...props} />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-accent underline decoration-accent-soft underline-offset-2 transition-colors hover:decoration-accent"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mb-4 rounded-r-lg border-l-4 border-accent bg-accent-soft px-5 py-3 italic text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-line" />,
  code: (props) => (
    <code
      className="rounded bg-paper px-1.5 py-0.5 font-mono text-sm text-ink"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-ink p-4 text-sm text-paper"
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
          className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-accent"
        >
          &larr; Alle artikelen
        </Link>

        <header className="mt-8">
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
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm text-ink-soft">
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
          <hr className="mt-8 border-line" />
        </header>

        <div className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        <div className="warm-card mt-16 bg-sage-soft p-8">
          <h3 className="hand text-2xl font-bold text-ink">
            Aan de slag met AI-geletterdheid?
          </h3>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Begin gratis met de academy: zes e-learnings over AI-geletterdheid,
            plus een verdieping voor developers. Wil je het op maat voor je
            organisatie, met jullie eigen voorbeelden en beleid? Dan maak ik een
            e-learning of training op maat.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/academy" className="btn btn-primary">
              Naar de gratis academy
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Maatwerk aanvragen
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
