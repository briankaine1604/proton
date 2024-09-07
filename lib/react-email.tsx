import {
  Html,
  Text,
  Button,
  Container,
  Heading,
  Section,
  Img,
} from "@react-email/components";
import * as React from "react";

interface TemplateEmailProps {
  email: string;
  confirmLink?: string; // Optional for 2FA and verification emails
  token?: string; // Optional for verification emails and 2FA
  type: "verification" | "2fa" | "password-reset";
}

export const TemplateEmail: React.FC<TemplateEmailProps> = ({
  email,
  confirmLink,
  token,
  type,
}) => (
  <Html>
    <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Section style={{ textAlign: "center", marginBottom: "20px" }}>
        <Img
          src={process.env.EMAIL_IMAGE!}
          alt="Proton company logo"
          width="150"
          height="75"
          style={{ marginBottom: "20px" }}
        />
        <Heading as="h1" style={{ color: "#820001" }}>
          {type === "verification"
            ? "Verify Your Email"
            : type === "2fa"
            ? "Your 2FA Code"
            : "Reset Your Password"}
        </Heading>
        <Text style={{ fontSize: "16px", color: "#333" }}>Hi there,</Text>
        {type === "verification" && (
          <Text
            style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}
          >
            Thank you for signing up! Please click the button below to verify
            your email address.
          </Text>
        )}
        {type === "2fa" && (
          <Text
            style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}
          >
            Your 2FA code is: <strong>{token}</strong>
          </Text>
        )}
        {type === "password-reset" && (
          <Text
            style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}
          >
            Click the button below to reset your password.
          </Text>
        )}
        {(type === "verification" || type === "password-reset") &&
          confirmLink && (
            <Button
              href={confirmLink}
              style={{
                backgroundColor: "#820001",
                color: "#fff",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              {type === "verification" ? "Confirm Email" : "Reset Password"}
            </Button>
          )}
      </Section>
      <Section style={{ textAlign: "center", marginTop: "30px" }}>
        <Text style={{ fontSize: "12px", color: "#666" }}>
          If you didn&apos;t request this, you can ignore this email.
        </Text>
      </Section>
    </Container>
  </Html>
);
