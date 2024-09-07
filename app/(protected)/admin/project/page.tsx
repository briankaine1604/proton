import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { ProjectColumn } from "./components/columns";
import { format } from "date-fns";
import { ProjectClient } from "./components/client";

const Projects = async () => {
  const projects = await db.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProjects: ProjectColumn[] = projects.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    inStock: item.inStock,
  }));
  return (
    <div className="flex-col mx-auto pb-20">
      <div className="flex-1 pt-6 space-y-4">
        <ProjectClient data={formattedProjects} />
      </div>
    </div>
  );
};

export default Projects;
