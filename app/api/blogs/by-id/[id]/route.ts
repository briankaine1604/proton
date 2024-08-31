import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const blog = await db.blogPost.findUnique({
      where: { id },
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

export async function PATCH(req: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    // Parse the JSON body to get `id` and `value`
    const body = await req.json();

    const {
      id,
      title,
      coverImage,
      content,
      published,
      subtitle,
      categories,
      slug,
    } = body;

    if (!id || !title || !content) {
      return NextResponse.json(
        { error: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    // Start a transaction to ensure atomicity

    // Update the blog post
    await db.blogPost.update({
      where: { id },
      data: {
        title,
        coverImage,
        content,
        published,
        subtitle,
        slug,
      },
    });

    // Clear existing categories
    await db.blogPostCategory.deleteMany({
      where: { blogPostId: id },
    });

    // Add the new categories
    if (categories && categories.length > 0) {
      const blogPostCategories = categories.map((categoryId: string) => ({
        blogPostId: id,
        categoryId,
      }));

      await db.blogPostCategory.createMany({
        data: blogPostCategories,
      });
    }

    return NextResponse.json({ success: "Blog updated successfully" });
  } catch (error) {
    console.error("Failed to update blog", error);
    return NextResponse.json({ error: "Blog update failed" }, { status: 500 });
  }
}
