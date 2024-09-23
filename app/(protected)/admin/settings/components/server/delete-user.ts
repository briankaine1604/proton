"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export async function DeleteUser(userId: string) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    return { error: "Not authenticated" };
  }

  // Check if the user has admin privileges
  if (user.role !== UserRole.ADMIN) {
    return { error: "Only admins can delete users" };
  }

  // Fetch the user to be deleted
  const userToDelete = await db.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!userToDelete) {
    return { error: "User not found" };
  }

  // Ensure the root user cannot be deleted
  if (userToDelete.email === "admin@protonrealestate.com") {
    return { error: "Root user cannot be deleted" };
  }

  try {
    // Delete the user
    await db.user.delete({
      where: { id: userId },
    });

    return { success: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "User delete failed" };
  }
}
