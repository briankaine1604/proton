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
          style={{
            maxWidth: "150px", // Set the maximum width here
            display: "block", // Ensures the link behaves as a block element
            overflow: "hidden", // Hide overflow
            textOverflow: "ellipsis", // Add ellipsis for overflowed text
            whiteSpace: "nowrap", // Prevent the text from wrapping
          }}
        >
          {row.original.link}
        </a>
      ) : (
        <span>No link available</span> // Or you can handle this in another way
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
