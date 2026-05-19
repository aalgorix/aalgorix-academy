import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CONTENTFUL_BLOG_CACHE_TAG } from "../../lib/contentful-blog";

/** POST /api/revalidate-blog?secret=YOUR_SECRET — call after publishing in Contentful. */
export async function POST(request: Request) {
  const secret = process.env.CONTENTFUL_REVALIDATE_SECRET;
  const { searchParams } = new URL(request.url);
  const provided = searchParams.get("secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag(CONTENTFUL_BLOG_CACHE_TAG);
  revalidatePath("/blog");

  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}
