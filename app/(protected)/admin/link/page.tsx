import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { format } from "date-fns";
import { LinkColumn } from "./components/columns";
import { LinkClient } from "./components/client";

const Links = async () => {
  const Link = await db.externalLinks.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLink: LinkColumn[] = Link.map((item) => ({
    id: item.id,
    link: item.link,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col mx-auto pb-20">
      <div className="flex-1 pt-6 space-y-4">
        <LinkClient data={formattedLink} />
      </div>
    </div>
  );
};

export default Links;
