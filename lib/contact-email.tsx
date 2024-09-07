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

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  attachment?: string; // Optional for cases where no attachment is provided
}

export const ContactEmail: React.FC<ContactEmailProps> = ({
  name,
  email,
  phone,
  message,
  attachment,
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
          New Contact Form Submission
        </Heading>
        <Text style={{ fontSize: "16px", color: "#333" }}>Hi there,</Text>
        <Text style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}>
          You have a new contact form submission. Here are the details:
        </Text>
        <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
          <strong>Name:</strong> {name}
        </Text>
        <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
          <strong>Email:</strong> {email}
        </Text>
        <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
          <strong>Phone:</strong> {phone}
        </Text>
        <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
          <strong>Message:</strong> {message}
        </Text>
        {attachment && (
          <Text
            style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}
          >
            <strong>Attachment:</strong> {attachment}
          </Text>
        )}
      </Section>
      <Section style={{ textAlign: "center", marginTop: "30px" }}>
        <Text style={{ fontSize: "12px", color: "#666" }}>
          Please check the details above and follow up accordingly.
        </Text>
      </Section>
    </Container>
  </Html>
);
