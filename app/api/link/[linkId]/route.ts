import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const { linkId } = params;

  try {
    const Link = await db.externalLinks.findUnique({
      where: { id: linkId },
      select: {
        id: true,
        link: true,

        createdAt: true,
        updatedAt: true,
      },
    });

    if (!Link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(Link, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch link`, error);
    return NextResponse.json(
      { error: "Failed to fetch Link" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { linkId: string } }
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
  const { linkId } = params;
  const { link } = await req.json();

  try {
    const updatedLink = await db.externalLinks.update({
      where: { id: linkId },
      data: {
        link,
      },
    });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (error) {
    console.error(`Failed to update Link`, error);
    return NextResponse.json(
      { error: "Failed to update Link" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const { linkId } = params;
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
    await db.externalLinks.delete({
      where: { id: linkId },
    });

    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Failed to delete Link`, error);
    return NextResponse.json(
      { error: "Failed to delete Link" },
      { status: 500 }
    );
  }
}
