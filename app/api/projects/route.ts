import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const projects = await db.project.findMany({
      select: {
        id: true,
        address: true,
        name: true,
        price: true,
        images: true,
        createdAt: true,
        updatedAt: true,
        inStock: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
