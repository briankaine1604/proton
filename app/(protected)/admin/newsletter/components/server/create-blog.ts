"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { BlogPost, UserRole } from "@prisma/client";
import { z } from "zod";
import { BlogSchema } from "../../[newsletterId]/components/form";

export async function CreateBlog(values: z.infer<typeof BlogSchema>) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    throw new Error("Not authenticated");
  }

  // Check if the user has admin privileges
  //   if (user.role !== UserRole.ADMIN) {
  //     throw new Error("Only admins can delete users");
  //   }

  try {
    // Delete the user
    await db.blogPost.create({
      data: {
        ...values,
      },
    });
    return { success: "Blog saved successfully" };
  } catch (error) {
    console.error("Error saving blog");
    return { error: "Blog failed to save" };
  }
}
