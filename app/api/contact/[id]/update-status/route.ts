import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

export const config = {
  api: {
    bodyParser: true,
  },
};
