"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { BlogSchema } from "../../[newsletterId]/components/form";

type Props = {
  id: string;
  value: z.infer<typeof BlogSchema>;
};

export async function UpdateBlog({ id, value }: Props) {
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  // if (user.role !== UserRole["ADMIN"]) {
  //   throw new Error("Only admins can update user roles");
  // }
  // Update the user's role directly
  try {
    await db.blogPost.update({
      data: {
        ...value,
      },
      where: {
        id,
      },
    });

    return { success: "Blog updated successfully" };
  } catch (error) {
    return { error: "Blog update failed" };
  }
}
