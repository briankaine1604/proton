"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { z } from "zod";
import { BlogSchema } from "../../[teamId]/components/form";
import { slugify } from "@/components/slug";

export async function CreateBlog(values: z.infer<typeof BlogSchema>) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  const { title, subtitle, coverImage, content, published, categories } =
    values;

  try {
    // Generate a slug from the blog title
    let slug = slugify(title);

    // Ensure the slug is unique by checking the database and appending a unique suffix if necessary
    const existingBlog = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      slug = `${slug}-${Date.now()}`; // Append a timestamp to ensure uniqueness
    }

    // Create the blog post with the slug
    const blogPost = await db.blogPost.create({
      data: {
        title,
        subtitle,
        coverImage,
        content,
        slug, // Save the slug
        published: published || false, // Default to false if not provided
      },
    });

    const blogPostCategories = categories.map((categoryId) => {
      return { blogPostId: blogPost.id, categoryId };
    });

    await db.blogPostCategory.createMany({
      data: blogPostCategories,
    });

    return { success: "Blog saved successfully" };
  } catch (error) {
    console.error("Error saving blog", error);
    return { error: "Blog failed to save" };
  }
}
