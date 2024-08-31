import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const teamMember = await db.teamMember.findUnique({
      where: { id },
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
    console.error(`Failed to fetch team member with id ${id}`, error);
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name, bio, image, role } = await req.json();

  try {
    const updatedTeamMember = await db.teamMember.update({
      where: { id },
      data: {
        name,
        bio,
        image,
        role,
      },
    });

    return NextResponse.json(updatedTeamMember, { status: 200 });
  } catch (error) {
    console.error(`Failed to update team member with id ${id}`, error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await db.teamMember.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Team member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Failed to delete team member with id ${id}`, error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
