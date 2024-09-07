import { db } from "@/lib/db";
import { LinkForm } from "./components/form";

const Link = async ({ params }: { params: { linkId: string } }) => {
  const data = await db.externalLinks.findUnique({
    where: {
      id: params.linkId,
    },
  });

  if (data) {
    // Convert the Decimal fields to strings or numbers
    return <LinkForm initialData={data} />;
  }

  return <LinkForm />;
};

export default Link;
