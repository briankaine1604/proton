import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Your GET handler
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const project = await db.project.findUnique({
      where: { slug },
      include: {
        images: true,
      },
    });

    if (project) {
      return NextResponse.json(project, { status: 200 });
    } else {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to fetch project", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
