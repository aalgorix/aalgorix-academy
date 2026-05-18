import type { Document } from "@contentful/rich-text-types";

/** Contentful CDN asset file payload */
export interface ContentfulAssetFile {
  url: string;
  details?: {
    size?: number;
    image?: { width?: number; height?: number };
  };
  fileName?: string;
  contentType?: string;
}

export interface ContentfulAssetFields {
  title?: string;
  description?: string;
  file: ContentfulAssetFile;
}

export interface ContentfulAsset {
  sys: {
    id: string;
    type?: string;
    linkType?: string;
  };
  fields: ContentfulAssetFields;
}

export interface ContentfulSysLink {
  sys: {
    type: "Link";
    linkType: "Asset" | "Entry";
    id: string;
  };
}

export interface BlogPostFields {
  title: string;
  slug: string;
  coverImage?: ContentfulAsset | ContentfulSysLink;
  bodyContent?: Document;
}

export interface BlogPostEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: BlogPostFields;
}

export interface ContentfulIncludes {
  Asset?: ContentfulAsset[];
  Entry?: BlogPostEntry[];
}

export interface ContentfulCollectionResponse {
  sys: { type: string };
  total: number;
  skip: number;
  limit: number;
  items: BlogPostEntry[];
  includes?: ContentfulIncludes;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  coverImage: ContentfulAsset | null;
  /** True when a cover image is linked in the entry but not published to the Delivery API. */
  coverImageUnpublished: boolean;
  bodyContent: Document | null;
}

export const CONTENTFUL_BLOG_CACHE_TAG = "contentful-blog-posts";

/** Contentful content type ID (Settings → Content model → API identifier). */
const CONTENT_TYPE =
  process.env.CONTENTFUL_BLOG_CONTENT_TYPE ?? "aalgorixAcademyBlog";

function getCredentials(): { spaceId: string; accessToken: string } {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (
    !spaceId ||
    !accessToken ||
    spaceId === "your_space_id_here" ||
    accessToken === "your_access_token_here"
  ) {
    throw new Error(
      "Contentful credentials are missing. Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local."
    );
  }

  return { spaceId, accessToken };
}

function getContentfulBaseUrl(spaceId: string): string {
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
  return `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`;
}

function resolveAssetFromIncludes(
  field: BlogPostFields["coverImage"],
  includes?: ContentfulIncludes
): ContentfulAsset | null {
  if (!field) return null;

  if ("fields" in field && field.fields?.file?.url) {
    return field as ContentfulAsset;
  }

  const link = field as ContentfulSysLink;
  if (link.sys?.linkType !== "Asset") return null;

  return includes?.Asset?.find((a) => a.sys.id === link.sys.id) ?? null;
}

function getCoverImageLinkId(field: BlogPostFields["coverImage"]): string | null {
  if (!field) return null;
  if ("fields" in field && field.fields?.file?.url) return null;

  const link = field as ContentfulSysLink;
  return link.sys?.linkType === "Asset" ? link.sys.id : null;
}

async function fetchAssetById(
  baseUrl: string,
  accessToken: string,
  assetId: string
): Promise<ContentfulAsset | null> {
  const response = await fetch(`${baseUrl}/assets/${assetId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: {
      tags: [CONTENTFUL_BLOG_CACHE_TAG],
      revalidate: 3600,
    },
  });

  if (!response.ok) return null;
  return (await response.json()) as ContentfulAsset;
}

async function resolveCoverImage(
  field: BlogPostFields["coverImage"],
  includes: ContentfulIncludes | undefined,
  baseUrl: string,
  accessToken: string,
  assetCache: Map<string, ContentfulAsset | null>
): Promise<{ asset: ContentfulAsset | null; unpublished: boolean }> {
  const fromIncludes = resolveAssetFromIncludes(field, includes);
  if (fromIncludes) {
    return { asset: fromIncludes, unpublished: false };
  }

  const linkId = getCoverImageLinkId(field);
  if (!linkId) {
    return { asset: null, unpublished: false };
  }

  if (assetCache.has(linkId)) {
    const cached = assetCache.get(linkId) ?? null;
    return { asset: cached, unpublished: cached === null };
  }

  const fetched = await fetchAssetById(baseUrl, accessToken, linkId);
  assetCache.set(linkId, fetched);
  return { asset: fetched, unpublished: fetched === null };
}

async function mapEntry(
  entry: BlogPostEntry,
  includes: ContentfulIncludes | undefined,
  baseUrl: string,
  accessToken: string,
  assetCache: Map<string, ContentfulAsset | null>
): Promise<BlogPost> {
  const { asset, unpublished } = await resolveCoverImage(
    entry.fields.coverImage,
    includes,
    baseUrl,
    accessToken,
    assetCache
  );

  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    coverImage: asset,
    coverImageUnpublished: unpublished,
    bodyContent: entry.fields.bodyContent ?? null,
  };
}

export function getAssetUrl(asset: ContentfulAsset | null): string | null {
  const raw = asset?.fields?.file?.url;
  if (!raw) return null;
  return raw.startsWith("//") ? `https:${raw}` : raw;
}

/** Tiny Contentful transform URL for Next.js blur placeholder. */
export function getAssetBlurUrl(imageUrl: string): string {
  const separator = imageUrl.includes("?") ? "&" : "?";
  return `${imageUrl}${separator}w=16&q=20&fm=jpg`;
}

export function getAssetAlt(asset: ContentfulAsset | null, fallback: string): string {
  return asset?.fields?.description?.trim() || asset?.fields?.title?.trim() || fallback;
}

export function formatPublishDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchEntries(
  searchParams: URLSearchParams
): Promise<ContentfulCollectionResponse> {
  const { spaceId, accessToken } = getCredentials();
  const baseUrl = getContentfulBaseUrl(spaceId);

  searchParams.set("include", "10");

  const url = `${baseUrl}/entries?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: {
      tags: [CONTENTFUL_BLOG_CACHE_TAG],
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `Contentful API responded with ${response.status} ${response.statusText}${body ? `: ${body.slice(0, 200)}` : ""}`
    );
  }

  return (await response.json()) as ContentfulCollectionResponse;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { spaceId, accessToken } = getCredentials();
  const baseUrl = getContentfulBaseUrl(spaceId);

  const params = new URLSearchParams({
    content_type: CONTENT_TYPE,
    order: "-sys.createdAt",
  });

  const data = await fetchEntries(params);
  const assetCache = new Map<string, ContentfulAsset | null>();

  return Promise.all(
    data.items.map((item) => mapEntry(item, data.includes, baseUrl, accessToken, assetCache))
  );
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { spaceId, accessToken } = getCredentials();
  const baseUrl = getContentfulBaseUrl(spaceId);

  const params = new URLSearchParams({
    content_type: CONTENT_TYPE,
    "fields.slug": slug,
    limit: "1",
  });

  const data = await fetchEntries(params);
  const entry = data.items[0];
  if (!entry) return null;

  const assetCache = new Map<string, ContentfulAsset | null>();
  return mapEntry(entry, data.includes, baseUrl, accessToken, assetCache);
}
