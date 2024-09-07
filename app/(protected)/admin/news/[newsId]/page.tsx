import { db } from "@/lib/db";
import { LinkForm } from "./components/form";

const Link = async ({ params }: { params: { newsId: string } }) => {
  const data = await db.announcement.findUnique({
    where: {
      id: params.newsId,
    },
  });

  if (data) {
    // Convert the Decimal fields to strings or numbers
    return <LinkForm initialData={data} />;
  }

  return <LinkForm />;
};

export default Link;
