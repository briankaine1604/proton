import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await db.blogPost.findMany({
      select: {
        id: true,
        title: true,
        subtitle: true,
        coverImage: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: { published: true },
      take: 4, // Hard limit to 4 posts
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch top blogs", error);
    return NextResponse.json(
      { error: "Failed to fetch top blogs" },
      { status: 500 }
    );
  }
}
