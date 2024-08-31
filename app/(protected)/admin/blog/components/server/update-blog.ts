import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { z } from "zod";
import { BlogSchema } from "../../[blogId]/components/form";

type Props = {
  id: string;
  value: z.infer<typeof BlogSchema>;
};

export async function UpdateBlog({ id, value }: Props) {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  try {
    // Start a transaction to ensure atomicity
    await db.$transaction(async (prisma) => {
      // Update the blog post
      await prisma.blogPost.update({
        where: { id },
        data: {
          title: value.title,
          coverImage: value.coverImage,
          content: value.content,
          published: value.published,
          subtitle: value.subtitle,
        },
      });

      // Clear existing categories
      await prisma.blogPostCategory.deleteMany({
        where: { blogPostId: id },
      });

      // Add the new categories
      const blogPostCategories = value.categories.map((categoryId) => ({
        blogPostId: id,
        categoryId,
      }));

      await prisma.blogPostCategory.createMany({
        data: blogPostCategories,
      });
    });

    return { success: "Blog updated successfully" };
  } catch (error) {
    console.error("Failed to update blog", error);
    return { error: "Blog update failed" };
  }
}
