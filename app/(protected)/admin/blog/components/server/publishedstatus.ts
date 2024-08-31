"use server";

import { db } from "@/lib/db";

export async function updateBlogPublishedStatus(
  id: string,
  published: boolean
) {
  try {
    console.log({ id: id, p: published });
    await db.blogPost.update({
      where: { id },
      data: { published },
    });
    return { sucess: "Published status updated successfully" };
  } catch (error) {
    console.error("Error updating published status:", error);
    return { error: "Failed to update published status" };
  }
}
