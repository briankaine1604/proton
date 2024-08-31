import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const teamMembers = await db.teamMember.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch team members", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { name, bio, image, role } = await req.json();

  try {
    const newTeamMember = await db.teamMember.create({
      data: {
        name,
        bio,
        image,
        role,
      },
    });

    return NextResponse.json(newTeamMember, { status: 201 });
  } catch (error) {
    console.error("Failed to create team member", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
