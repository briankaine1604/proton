"use client";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";

import { columns, ContactColumn } from "./columns";
import Container from "@/components/MaxWidthWrapper";
import PathTrail from "@/components/Breadcrumb";

interface ContactClientProps {
  data: ContactColumn[];
}
export const ContactClient: React.FC<ContactClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Container>
        <PathTrail />
        <div className="flex justify-between">
          <h1 className=" text-xl sm:text-3xl  font-semibold">Contacts</h1>
        </div>

        <Separator className=" my-2" />
        <DataTable columns={columns} data={data} />
      </Container>
    </>
  );
};
