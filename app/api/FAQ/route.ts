import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const FAQs = await db.fAQ.findMany({
      select: {
        id: true,
        question: true,
        answer: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(FAQs, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch FAQ", error);
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { question, answer } = await req.json();

  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json(
        { error: "Not authenticated!" },
        { status: 401 }
      );
    }
    // Check if the user has admin privileges
    if (user.role !== UserRole.ADMIN && user.role !== UserRole.STAFF) {
      return NextResponse.json(
        { error: "Only admins or staff can update status" },
        { status: 403 }
      );
    }

    const NewFAQs = await db.fAQ.create({
      data: {
        question,
        answer,
      },
    });

    return NextResponse.json({ message: "FAQ added" }, { status: 201 });
  } catch (error) {
    console.error("Failed to create FAQ", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
