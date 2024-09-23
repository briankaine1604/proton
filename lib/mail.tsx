import { TemplateEmail } from "@/lib/react-email";
import { render } from "@react-email/components";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const htmlContent = await render(
    <TemplateEmail email={email} token={token} type="2fa" />
  );

  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_EMAIL!,
    to: email,
    subject: "Your 2FA Code",
    html: htmlContent,
  });

  if (error) {
    return console.error({ error });
  }

  // console.log({ data });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const htmlContent = await render(
    <TemplateEmail
      email={email}
      confirmLink={confirmLink}
      type="verification"
    />
  );

  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_EMAIL!,
    to: email,
    subject: "Confirm your Email",
    html: htmlContent,
  });

  if (error) {
    return console.error({ error });
  }

  // console.log({ data });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const htmlContent = await render(
    <TemplateEmail
      email={email}
      confirmLink={resetLink}
      type="password-reset"
    />
  );

  const { data, error } = await resend.emails.send({
    from: process.env.SENDING_EMAIL!,
    to: email,
    subject: "Reset your password",
    html: htmlContent,
  });

  if (error) {
    return console.error({ error });
  }

  // console.log({ data });
};
