"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { columns, NewsColumn } from "./columns";
import Container from "@/components/MaxWidthWrapper";
import PathTrail from "@/components/Breadcrumb";

interface LinkClientProps {
  data: NewsColumn[];
}

export const NewsClient: React.FC<LinkClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  // Determine if there's already a news item
  const hasNews = data.length > 0;

  return (
    <>
      <Container>
        <PathTrail />
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold">News</h1>
            <div className="text-sm">(Only one announcement at a time)</div>
          </div>
          <Button
            onClick={() => router.push(`/admin/news/new`)}
            disabled={hasNews} // Disable the button if there's already a news item
          >
            <Plus className="mr-2 w-4 h-4" />
            {hasNews ? "News already exists" : "Add new"}
          </Button>
        </div>

        <Separator className="my-2" />
        <DataTable columns={columns} data={data} />
      </Container>
    </>
  );
};
