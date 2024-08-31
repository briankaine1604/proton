import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { format } from "date-fns";
import { TeamColumn } from "./components/columns";
import { TeamClient } from "./components/client";

const Projects = async () => {
  const team = await db.teamMember.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTeam: TeamColumn[] = team.map((item) => ({
    id: item.id,
    name: item.name,
    role: item.role,
    image: item.image,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col max-w-6xl mx-auto">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <TeamClient data={formattedTeam} />
      </div>
    </div>
  );
};

export default Projects;
