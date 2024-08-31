"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { updateBlogPublishedStatus } from "./server/publishedstatus";
import { toast } from "sonner";
// Adjust the import path accordingly

export type TeamColumn = {
  id: string;
  name: string;
  image: string;
  role: string;
  createdAt: string;
};

export const columns: ColumnDef<TeamColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "coverImage",
    header: "Cover Image",
    cell: ({ row }) => (
      <div className="w-[80px] h-[50px] relative">
        <Image src={row.original.image} alt="" fill />
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
