import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import {
  fetchBlogPosts,
  formatPublishDate,
  getAssetAlt,
  getAssetUrl,
  type BlogPost,
} from "../lib/contentful-blog";
import { BlogRichText } from "../lib/blog-rich-text";

export const metadata: Metadata = {
  title: "Blog | Aalgorix World Academy",
  description:
    "Insights, updates, and stories from Aalgorix World Academy on AI education, homeschooling, and future-ready learning.",
};

/** Page ISR interval (seconds). Contentful fetch cache is controlled separately in contentful-blog.ts. */
export const revalidate = 60;

/*
  next.config.ts — add to images.remotePatterns so Next.js <Image /> can load Contentful assets:

  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.ctfassets.net',
      pathname: '/**',
    },
  ],
*/

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='8' height='5' fill='%23e2e8f0' filter='url(%23b)'/%3E%3C/svg%3E";

function BlogErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-500/25 dark:bg-red-500/10"
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-200" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-red-800 dark:text-red-100">
            We couldn&apos;t load the blog right now
          </p>
          <p className="mt-1 text-sm leading-relaxed text-red-700/90 dark:text-red-100/80">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

function BlogEmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm dark:border-white/15 dark:bg-black/30 dark:shadow-none">
      <p className="text-lg font-semibold text-slate-900 dark:text-white/90">
        No posts found yet. Check back soon!
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-white/60">
        We&apos;re preparing articles on AI education, learning at home, and student success. Visit
        again shortly.
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex rounded-xl bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white/90 dark:text-black dark:hover:bg-white"
      >
        Talk to admissions
      </Link>
    </div>
  );
}

function ReadMoreLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:bg-black/20 dark:text-white/85 dark:hover:bg-white/10"
    >
      Read More
      <span aria-hidden>→</span>
    </Link>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  const imageUrl = getAssetUrl(post.coverImage);
  const imageAlt = getAssetAlt(post.coverImage, post.title);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-black/30 dark:shadow-none dark:hover:border-white/20">
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5 lg:aspect-auto lg:min-h-[360px]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-slate-500 dark:text-white/50">
              No cover image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="badge-ai mb-3 inline-block w-fit">Latest</p>
          <time
            dateTime={post.createdAt}
            className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/50"
          >
            {formatPublishDate(post.createdAt)}
          </time>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors hover:text-slate-700 dark:hover:text-white/80"
            >
              {post.title}
            </Link>
          </h2>

          {post.bodyContent && (
            <div className="mt-4 line-clamp-6 text-sm [&_h1]:text-xl [&_h2]:text-lg [&_p]:mb-2 [&_p]:text-slate-600 dark:[&_p]:text-white/65">
              <BlogRichText document={post.bodyContent} />
            </div>
          )}

          <div className="mt-8">
            <ReadMoreLink slug={post.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const imageUrl = getAssetUrl(post.coverImage);
  const imageAlt = getAssetAlt(post.coverImage, post.title);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-black/30 dark:shadow-none dark:hover:border-white/20">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full min-h-[180px] items-center justify-center text-sm text-slate-500 dark:text-white/50">
            No cover image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <time
          dateTime={post.createdAt}
          className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/50"
        >
          {formatPublishDate(post.createdAt)}
        </time>
        <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 dark:text-white/90">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-slate-700 dark:hover:text-white/75"
          >
            {post.title}
          </Link>
        </h3>
        <div className="mt-auto pt-6">
          <ReadMoreLink slug={post.slug} />
        </div>
      </div>
    </article>
  );
}

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let errorMessage: string | null = null;

  try {
    posts = await fetchBlogPosts();
  } catch (err) {
    errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred while loading posts.";
  }

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 md:px-8 md:pb-20">
        <section className="mx-auto max-w-3xl text-center">
          <p className="badge-ai mb-4 inline-block">Blog</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Insights for future-ready learners
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/70 md:text-base">
            Stories, guides, and updates from Aalgorix World Academy on AI tutoring, homeschooling,
            and building confident learners at home.
          </p>
        </section>

        <section className="mt-12 md:mt-16">
          {errorMessage ? (
            <BlogErrorState message={errorMessage} />
          ) : posts.length === 0 ? (
            <BlogEmptyState />
          ) : (
            <>
              {featured && (
                <div className="mb-12 md:mb-16">
                  <FeaturedPost post={featured} />
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <h2 className="mb-8 text-xl font-bold tracking-tight text-slate-900 dark:text-white/90 md:text-2xl">
                    More articles
                  </h2>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
