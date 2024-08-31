"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

type Props = {
  userId: string;
  userRole: UserRole;
};

export async function UpdateUserRole({ userId, userRole }: Props) {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  if (user.role !== UserRole["ADMIN"]) {
    throw new Error("Only admins can update user roles");
  }
  // Update the user's role directly
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role: userRole },
    });

    return { success: "User role updated successfully", updatedUser };
  } catch (error) {
    return { error: "User role update failed" };
  }
}
