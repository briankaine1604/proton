"use server";

import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { z } from "zod";
import { ProjectSchema } from "../../[projectId]/components/form";

type Props = {
  id: string;
  values: z.infer<typeof ProjectSchema>;
};

export async function UpdateProject({ id, values }: Props) {
  const user = await currentUser();
  const { name, price, description, address, inStock, images } = values;
  if (!user?.id) {
    return { error: "Not authenticated!" };
  }

  try {
    // Start a transaction to ensure atomicity
    await db.$transaction(async (prisma) => {
      // Update the project
      const project = await prisma.project.update({
        data: {
          name,
          price,
          description,
          address,
          inStock,
        },
        where: {
          id,
        },
      });

      // If there are new images, delete the old ones and create the new ones
      if (images?.length > 0) {
        await prisma.image.deleteMany({
          where: {
            projectId: project.id,
          },
        });

        // Create new images
        await prisma.image.createMany({
          data: values.images.map((image) => ({
            url: image.url,
            projectId: project.id,
          })),
        });
      }
    });

    return { success: "Project updated successfully" };
  } catch (error) {
    console.error("Error updating project:", error);
    return { error: "Project update failed" };
  }
}
