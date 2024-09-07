"use client";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { columns, FAQColumn } from "./columns";
import Container from "@/components/MaxWidthWrapper";
import PathTrail from "@/components/Breadcrumb";

interface FAQClientProps {
  data: FAQColumn[];
}
export const FAQClient: React.FC<FAQClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Container>
        <PathTrail />
        <div className="flex justify-between">
          <h1 className=" text-xl sm:text-3xl  font-semibold">FAQs</h1>
          <Button onClick={() => router.push(`/admin/FAQ/new`)}>
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
