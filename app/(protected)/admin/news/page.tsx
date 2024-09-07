import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { format } from "date-fns";
import { NewsColumn } from "./components/columns";
import { NewsClient } from "./components/client";

const Links = async () => {
  const Link = await db.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLink: NewsColumn[] = Link.map((item) => ({
    id: item.id,
    link: item.link,
    content: item.content,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col mx-auto pb-20">
      <div className="flex-1 pt-6 space-y-4">
        <NewsClient data={formattedLink} />
      </div>
    </div>
  );
};

export default Links;
