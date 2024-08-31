"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { updateBlogPublishedStatus } from "./server/publishedstatus";
import { toast } from "sonner";
// Adjust the import path accordingly

export type NewsletterColumn = {
  id: string;
  name: string;
  newsletterId: string;
  createdAt: string;
  status: string;
  scheduledTime: string;
};

// New React component for handling the published switch

export const columns: ColumnDef<NewsletterColumn>[] = [
  {
    accessorKey: "name",
    header: "Newsletter Title",
  },

  {
    accessorKey: "newletterId",
    header: "Newsletter Id",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "scheduledTime",
    header: "Scheduled Time",
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
