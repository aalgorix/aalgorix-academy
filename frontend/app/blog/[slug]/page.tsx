import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import {
  fetchBlogPostBySlug,
  formatPublishDate,
  getAssetAlt,
  getAssetUrl,
} from "../../lib/contentful-blog";
import { BlogRichText } from "../../lib/blog-rich-text";

export const revalidate = 3600;

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='8' height='5' fill='%23e2e8f0' filter='url(%23b)'/%3E%3C/svg%3E";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await fetchBlogPostBySlug(slug);
    if (!post) return { title: "Post not found | Aalgorix Blog" };

    return {
      title: `${post.title} | Aalgorix Blog`,
      description: `Read "${post.title}" on the Aalgorix World Academy blog.`,
    };
  } catch {
    return { title: "Blog | Aalgorix World Academy" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post = null;
  let errorMessage: string | null = null;

  try {
    post = await fetchBlogPostBySlug(slug);
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred while loading this post.";
  }

  if (!errorMessage && !post) notFound();

  const imageUrl = post ? getAssetUrl(post.coverImage) : null;
  const imageAlt = post ? getAssetAlt(post.coverImage, post.title) : "";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900 dark:text-white/60 dark:hover:text-white/90"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to blog
        </Link>

        {errorMessage ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-500/25 dark:bg-red-500/10"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-200"
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-red-800 dark:text-red-100">
                  We couldn&apos;t load this article
                </p>
                <p className="mt-1 text-sm leading-relaxed text-red-700/90 dark:text-red-100/80">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        ) : post ? (
          <article>
            {imageUrl && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/5">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  className="object-cover"
                />
              </div>
            )}

            <p className="badge-ai mb-4 inline-block">Article</p>
            <time
              dateTime={post.createdAt}
              className="block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/50"
            >
              {formatPublishDate(post.createdAt)}
            </time>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>

            {post.bodyContent ? (
              <div className="mt-8 border-t border-slate-200 pt-8 dark:border-white/10">
                <BlogRichText document={post.bodyContent} />
              </div>
            ) : (
              <p className="mt-8 text-sm text-slate-600 dark:text-white/60">
                This post has no body content yet.
              </p>
            )}
          </article>
        ) : null}
      </main>
    </div>
  );
}
