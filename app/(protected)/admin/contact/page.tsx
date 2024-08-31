import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { format } from "date-fns";
import { ContactColumn } from "./components/columns";
import { ContactClient } from "./components/client";

const Contact = async () => {
  const Contact = await db.contactForm.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedContact: ContactColumn[] = Contact.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    status: item.status,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col mx-auto">
      <div className="flex-1 pt-6 space-y-4">
        <ContactClient data={formattedContact} />
      </div>
    </div>
  );
};

export default Contact;
