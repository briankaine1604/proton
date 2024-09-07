import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const links = await db.externalLinks.findMany({
      select: {
        id: true,
        link: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch Link", error);
    return NextResponse.json(
      { error: "Failed to fetch Link" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { link } = await req.json();
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Not authenticated!" }, { status: 401 });
  }
  // Check if the user has admin privileges
  if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
    return NextResponse.json(
      { error: "Only admins or staff can update status" },
      { status: 403 }
    );
  }

  try {
    const NewLinks = await db.externalLinks.create({
      data: {
        link,
      },
    });

    return NextResponse.json(NewLinks, { status: 201 });
  } catch (error) {
    console.error("Failed to create Link", error);
    return NextResponse.json(
      { error: "Failed to create Link" },
      { status: 500 }
    );
  }
}
