"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ContactColumn = {
  id: string;
  name: string | null;
  email: string | null;

  createdAt: string;
  status: "PENDING" | "REVIEWED" | "RESPONDED"; // Include status here
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "name",
    header: "Contact Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "status", // Include status column
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      // Map status to labels and colors
      const getStatusLabel = (status: string) => {
        switch (status) {
          case "PENDING":
            return (
              <span className=" bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full px-2 py-1 text-sm">
                Pending
              </span>
            );
          case "REVIEWED":
            return (
              <span className=" bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full px-2 py-1 text-sm">
                Reviewed
              </span>
            );
          case "RESPONDED":
            return (
              <span className=" bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full px-2 py-1 text-sm">
                Responded
              </span>
            );
          default:
            return (
              <span className=" bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full px-2 py-1 text-sm">
                Unknown
              </span>
            );
        }
      };

      return <div>{getStatusLabel(status)}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />, // Accessing original data
  },
];
