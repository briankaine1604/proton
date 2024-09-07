import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { NewsletterColumn } from "./components/columns";
import { format } from "date-fns";
import { NewsletterClient } from "./components/client";

const Newsletter = async () => {
  const newsletter = await db.newsletter.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedNewsletter: NewsletterColumn[] = newsletter.map((item) => ({
    id: item.id,
    name: item.name,
    newsletterId: item.newsletterId,
    status: item.status,
    scheduledTime: item.scheduledTime
      ? format(item.scheduledTime, "MMMM do, yyyy")
      : "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col mx-auto pb-20">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <NewsletterClient data={formattedNewsletter} />
      </div>
    </div>
  );
};

export default Newsletter;
