"use server";
import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { z } from "zod";
import { ProjectSchema } from "../../[projectId]/components/form";
import { Decimal } from "@prisma/client/runtime/library";
import { slugify } from "@/components/slug";

// Slugify function to generate a URL-friendly slug

export async function CreateProject(values: z.infer<typeof ProjectSchema>) {
  // Get the current authenticated user
  const user = await currentUser();
  if (!user?.id) {
    return { error: "Not authenticated!" };
  }
  const { name, price, description, address, inStock, images } = values;

  try {
    // Generate a slug from the project name
    let slug = slugify(name);

    // Ensure the slug is unique by checking the database and appending a unique suffix if necessary
    const existingProject = await db.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      slug = `${slug}-${Date.now()}`; // Append a timestamp to ensure uniqueness
    }

    // Create the project with the slug
    const project = await db.project.create({
      data: {
        name,
        price: price !== null ? new Decimal(price) : null,
        description,
        address,
        inStock,
        slug, // Save the slug
      },
    });

    // Create images and associate them with the project
    if (images?.length > 0) {
      await db.image.createMany({
        data: images.map((image) => ({
          url: image.url,
          projectId: project.id,
        })),
      });
    }

    return { success: "Project saved successfully" };
  } catch (error) {
    console.error("Error saving project or images", error);
    return { error: "Project failed to save" };
  }
}
