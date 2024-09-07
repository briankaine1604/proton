import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { teamId: string } }
) {
  const { teamId } = params;

  try {
    const teamMember = await db.teamMember.findUnique({
      where: { id: teamId },
      select: {
        id: true,
        name: true,
        bio: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!teamMember) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(teamMember, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch team member`);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { teamId: string } }
) {
  const { teamId } = params;
  const { name, bio, image, role } = await req.json();
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
    const updatedTeamMember = await db.teamMember.update({
      where: { id: teamId },
      data: {
        name,
        bio,
        image,
        role,
      },
    });

    return NextResponse.json(updatedTeamMember, { status: 200 });
  } catch (error) {
    console.error(`Failed to update team member`, error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { teamId: string } }
) {
  const { teamId } = params;
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
    await db.teamMember.delete({
      where: { id: teamId },
    });

    return NextResponse.json(
      { message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Failed to delete team member`, error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
