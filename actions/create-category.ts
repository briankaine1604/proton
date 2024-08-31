// actions/create-category.ts
"use server";
import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export async function CreateCategory(values: z.infer<typeof CategorySchema>) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    return { error: "Not authenticated!" };
  }

  const { name } = values;

  try {
    // Create the category
    const category = await db.category.create({
      data: {
        name,
      },
    });

    return { success: "Category created successfully", category };
  } catch (error) {
    console.error("Error creating category", error);
    return { error: "Category creation failed" };
  }
}
