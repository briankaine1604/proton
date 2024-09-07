"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export async function DeleteProject(projectId: string) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    throw new Error("Only admins or staff can create project");
  }

  try {
    // Delete the user
    await db.project.delete({
      where: { id: projectId },
    });

    // Optionally handle token invalidation here if needed
    // Example: Update token blacklist or handle token revocation

    return { success: "Project deleted successfully" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { error: "Project delete failed" };
  }
}
