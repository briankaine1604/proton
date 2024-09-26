"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type NewsColumn = {
  id: string;
  link: string | null;
  content: string;
  createdAt: string;
};

// Function to extract YouTube video ID from the link

export const columns: ColumnDef<NewsColumn>[] = [
  {
    accessorKey: "content",
    header: "Info",
    cell: ({ row }) => (
      <div className="block max-w-[150px] lg:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap">
        {row.original.content}
      </div>
    ),
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) =>
      row.original.link ? (
        <a
          href={row.original.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-[150px] lg:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap text-blue-500 underline"
        >
          {row.original.link}
        </a>
      ) : (
        <span>No link available</span>
      ),
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
