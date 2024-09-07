import { Resend } from "resend";
import { render } from "@react-email/components";
import { ContactEmail } from "@/lib/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  attachment?: string;
}

export const sendContactEmail = async ({
  name,
  email,
  phone,
  message,
  attachment,
}: SendContactEmailProps) => {
  try {
    // Render the ContactEmail JSX into HTML
    const htmlContent = await render(
      <ContactEmail
        name={name}
        email={email}
        phone={phone}
        message={message}
        attachment={attachment}
      />
    );

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.SENDING_EMAIL!,
      to: process.env.RECEIVING_EMAIL!,
      subject: "Contact Form Submission",
      html: htmlContent, // Use the rendered HTML content
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
