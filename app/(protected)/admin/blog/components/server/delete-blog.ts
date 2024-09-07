"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export async function DeleteBlog(blogId: string) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }
  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return { error: "Only admins or staff can create projects" };
  }

  // Check if the user has admin privileges
  // if (user.role !== UserRole.ADMIN) {
  //   throw new Error("Only admins can delete users");
  // }

  try {
    // Delete the user
    await db.blogPost.delete({
      where: { id: blogId },
    });

    // Optionally handle token invalidation here if needed
    // Example: Update token blacklist or handle token revocation

    return { success: "blog deleted successfully" };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { error: "Blog delete failed" };
  }
}
