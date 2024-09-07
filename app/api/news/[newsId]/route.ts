import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { newsId: string } }
) {
  const { newsId } = params;

  try {
    const News = await db.announcement.findUnique({
      where: { id: newsId },
      select: {
        id: true,
        link: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!News) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(News, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch news`, error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { newsId: string } }
) {
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
  const { newsId } = params;
  const { link, content } = await req.json();

  try {
    const updatedNews = await db.announcement.update({
      where: { id: newsId },
      data: {
        content,
        link,
      },
    });

    return NextResponse.json(updatedNews, { status: 200 });
  } catch (error) {
    console.error(`Failed to update News`, error);
    return NextResponse.json(
      { error: "Failed to update News" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { newsId: string } }
) {
  const { newsId } = params;
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
    await db.announcement.delete({
      where: { id: newsId },
    });

    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Failed to delete News`, error);
    return NextResponse.json(
      { error: "Failed to delete News" },
      { status: 500 }
    );
  }
}
