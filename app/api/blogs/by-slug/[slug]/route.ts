import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const blog = await db.blogPost.findUnique({
      where: { slug, published: true },
      include: {
        categories: true,
      },
    });

    if (blog) {
      return NextResponse.json(blog, { status: 200 });
    } else {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to fetch blog", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
