import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    await db.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.error();
  }
}
