import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";

    const blogs = await db.blogPost.findMany({
      where: {
        AND: [
          search ? { title: { contains: search } } : {},
          category
            ? {
                categories: {
                  some: {
                    categoryId: category, // Use categoryId to filter by category ID
                  },
                },
              }
            : {},
        ],
      },
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
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
