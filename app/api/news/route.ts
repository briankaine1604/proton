import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const news = await db.announcement.findMany({
      select: {
        id: true,
        link: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch news", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { link, content } = await req.json();
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
    // Check if a news item already exists
    const existingNews = await db.announcement.findFirst();

    if (existingNews) {
      return NextResponse.json(
        { error: "Only one news item is allowed." },
        { status: 400 }
      );
    }

    // Create the news item since none exists
    const News = await db.announcement.create({
      data: {
        link,
        content,
      },
    });

    return NextResponse.json(News, { status: 201 });
  } catch (error) {
    console.error("Failed to create news", error);
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
