import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const contactForm = await db.contactForm.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true,
        attachment: true,
        createdAt: true,
      },
    });

    if (!contactForm) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contactForm, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch contact form with id ${params.id}`, error);
    return NextResponse.json(
      { error: "Failed to fetch contact form" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Destructure `id` from the URL params

    // Ensure the `id` is provided
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete the item from the database
    await db.contactForm.delete({
      where: { id },
    });

    // Success response
    return NextResponse.json(
      { message: "Contact form entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact form entry:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
