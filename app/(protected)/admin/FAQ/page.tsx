import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { format } from "date-fns";
import { FAQColumn } from "./components/columns";
import { FAQClient } from "./components/client";

const FAQ = async () => {
  const FAQ = await db.fAQ.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFAQ: FAQColumn[] = FAQ.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col mx-auto pb-20">
      <div className="flex-1 pt-6 space-y-4">
        <FAQClient data={formattedFAQ} />
      </div>
    </div>
  );
};

export default FAQ;
