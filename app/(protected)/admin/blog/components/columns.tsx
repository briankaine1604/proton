"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { updateBlogPublishedStatus } from "./server/publishedstatus";
import { toast } from "sonner";
// Adjust the import path accordingly

export type BlogPostColumn = {
  id: string;
  slug: string;
  title: string | null;
  coverImage: string;
  createdAt: string;
  published: boolean;
};

// New React component for handling the published switch
const PublishedSwitch: React.FC<{ row: BlogPostColumn }> = ({ row }) => {
  const [isChecked, setIsChecked] = useState(row.published);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (checked: boolean) => {
    setIsChecked(checked);

    startTransition(async () => {
      updateBlogPublishedStatus(row.id, checked).then((res) => {
        if (res.sucess) {
          toast.success(res.sucess);
        }
        if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={handleToggle}
      disabled={isPending} // Disable the switch while the action is pending
    />
  );
};

export const columns: ColumnDef<BlogPostColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "coverImage",
    header: "Cover Image",
    cell: ({ row }) => (
      <div className="w-[80px] h-[50px] relative">
        <Image src={row.original.coverImage} alt="" fill />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    header: "Published",
    cell: ({ row }) => <PublishedSwitch row={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
