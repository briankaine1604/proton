import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, attachment } = await req.json();

    // Store the contact form submission in the database
    const newContactForm = await db.contactForm.create({
      data: {
        name,
        email,
        phone,
        message,
        attachment,
      },
    });

    // Prepare email content for MailerSend
    const emailContent = {
      from: {
        email: "info@briankaine.com",
        name: "Your Website",
      },
      to: [
        {
          email: "bloomy.com.ng@gmail.com",
        },
      ],
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        ${attachment ? `<p><strong>Attachment:</strong> ${attachment}</p>` : ""}
      `,
    };

    // Send email using MailerSend
    await axios.post("https://api.mailersend.com/v1/email", emailContent, {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MAILERSEND_API_KEY,
      },
    });

    // Respond with the created contact form data
    return NextResponse.json(newContactForm, { status: 201 });
  } catch (error) {
    console.error("Failed to submit contact form", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
