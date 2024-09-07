import { db } from "@/lib/db";
import { FAQform } from "./components/form";

const FAQ = async ({ params }: { params: { FAQId: string } }) => {
  const data = await db.fAQ.findUnique({
    where: {
      id: params.FAQId,
    },
  });

  if (data) {
    // Convert the Decimal fields to strings or numbers
    return <FAQform initialData={data} />;
  }

  return <FAQform />;
};

export default FAQ;
