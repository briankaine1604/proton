// app/api/categories/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const CategorySchema = z.object({
  name: z.string().min(1),
});

export async function GET() {
  try {
    const categories = await db.category.findMany({});
    const categoryOptions = categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
    return NextResponse.json(categoryOptions);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = CategorySchema.parse(body);

    const newCategory = await db.category.create({
      data: { name },
    });

    return NextResponse.json({
      label: newCategory.name,
      value: newCategory.id,
    });
  } catch (error) {
    return NextResponse.error();
  }
}
