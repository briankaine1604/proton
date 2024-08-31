"use client";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { columns, ProjectColumn } from "./columns";
import Container from "@/components/MaxWidthWrapper";
import PathTrail from "@/components/Breadcrumb";

interface ProjectClientProps {
  data: ProjectColumn[];
}
export const ProjectClient: React.FC<ProjectClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Container>
        <PathTrail />
        <div className="flex justify-between">
          <h1 className=" text-3xl font-semibold">Projects</h1>
          <Button onClick={() => router.push(`/admin/project/new`)}>
            <Plus className="mr-2 w-4 h-4" />
            Add new{" "}
          </Button>
        </div>

        <Separator className=" my-2" />
        <DataTable columns={columns} data={data} />
      </Container>
    </>
  );
};
