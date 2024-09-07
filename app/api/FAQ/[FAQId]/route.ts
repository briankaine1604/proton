import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { FAQId: string } }
) {
  const { FAQId } = params;

  try {
    const FAQ = await db.fAQ.findUnique({
      where: { id: FAQId },
      select: {
        id: true,
        question: true,
        answer: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!FAQ) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(FAQ, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch FAQ`, error);
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { FAQId: string } }
) {
  const { FAQId } = params;
  const { answer, question } = await req.json();

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

    const updatedFAQ = await db.fAQ.update({
      where: { id: FAQId },
      data: {
        answer,
        question,
      },
    });

    return NextResponse.json(updatedFAQ, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { FAQId: string } }
) {
  const { FAQId } = params;

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

    await db.fAQ.delete({
      where: { id: FAQId },
    });

    return NextResponse.json(
      { message: "FAQ deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
