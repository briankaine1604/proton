import { db } from "@/lib/db";
import { ContactDetails } from "./components/contact-details";

const ContactPost = async ({ params }: { params: { contactId: string } }) => {
  const data = await db.contactForm.findUnique({
    where: {
      id: params.contactId,
    },
    include: {
      reviewers: {
        include: {
          user: true,
        },
      },
    },
  });

  if (data) {
    return <ContactDetails initialData={data} />;
  }

  return <p>No contact form found.</p>;
};

export default ContactPost;
