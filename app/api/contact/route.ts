import { db } from "@/lib/db";
import { sendContactEmail } from "@/lib/email-util";
import { NextResponse } from "next/server";
// Import the utility

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, attachment } = body;

    // Validate required fields
    if (!email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send the email using the utility function
    const result = await sendContactEmail({
      name,
      email,
      phone,
      message,
      attachment,
    });

    await db.contactForm.create({
      data: {
        name,
        email,
        phone,
        message,
        attachment,
      },
    });

    // Success response
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
