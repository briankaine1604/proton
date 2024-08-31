"use server";

import { db } from "@/lib/db";

export async function inStockStatus(id: string, inStock: boolean) {
  try {
    await db.project.update({
      where: { id },
      data: { inStock },
    });
    return { sucess: "Instock status updated successfully" };
  } catch (error) {
    console.error("Error updating instock status:", error);
    return { error: "Failed to update instock status" };
  }
}
