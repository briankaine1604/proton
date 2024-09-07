import { currentUser } from "@/hooks/use-current-user-server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;
    const { status, userId } = await req.json();

    // Update the status
    await db.contactForm.update({
      where: { id },
      data: { status },
    });

    // Add reviewer if status is "REVIEWED"
    if (status === "REVIEWED") {
      await db.reviewedBy.create({
        data: {
          userId,
          contactFormId: id,
        },
      });
    }

    return NextResponse.json(
      { message: "Status updated and reviewer added" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update status and add reviewer", error);
    return NextResponse.json(
      { error: "Failed to update status and add reviewer" },
      { status: 500 }
    );
  }
}
