import Image from "next/image";
import type { BlogPost } from "../lib/contentful-blog";
import { getAssetAlt, getAssetBlurUrl, getAssetUrl } from "../lib/contentful-blog";

type BlogCoverImageProps = {
  post: Pick<BlogPost, "title" | "coverImage" | "coverImageUnpublished">;
  priority?: boolean;
  sizes: string;
  className?: string;
  wrapperClassName?: string;
};

export default function BlogCoverImage({
  post,
  priority = false,
  sizes,
  className = "object-cover",
  wrapperClassName = "relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5",
}: BlogCoverImageProps) {
  const imageUrl = getAssetUrl(post.coverImage);
  const imageAlt = getAssetAlt(post.coverImage, post.title);

  if (imageUrl) {
    return (
      <div className={wrapperClassName}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          unoptimized
          placeholder="blur"
          blurDataURL={getAssetBlurUrl(imageUrl)}
          className={className}
        />
      </div>
    );
  }

  if (post.coverImageUnpublished) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border border-amber-200 bg-amber-50 px-4 text-center dark:border-amber-500/30 dark:bg-amber-500/10 ${wrapperClassName}`}
      >
        <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
          Cover image not published
        </p>
        <p className="max-w-xs text-xs leading-relaxed text-amber-800/90 dark:text-amber-100/75">
          In Contentful, open Media → publish the cover image, then publish the blog entry again.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center text-sm text-slate-500 dark:text-white/50 ${wrapperClassName}`}
    >
      No cover image
    </div>
  );
}
