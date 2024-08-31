"use server";
import { utapi } from "@/app/api/uploadthing/uploadthing";

export async function DeleteImage(imageKey: string) {
  try {
    // Delete the user
    await utapi.deleteFiles(imageKey);

    return { success: "Image deleted" };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { error: "Image delete failed" };
  }
}
