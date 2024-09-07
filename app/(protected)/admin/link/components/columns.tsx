"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";

export type LinkColumn = {
  id: string;
  link: string;
  createdAt: string;
};

// Function to extract YouTube video ID from the link
const extractYouTubeId = (url: string) => {
  const regExp =
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)|(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);
  return match ? match[1] || match[2] : null;
};

export const columns: ColumnDef<LinkColumn>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const videoId = extractYouTubeId(row.original.link);
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      return videoId ? (
        <Image
          src={thumbnailUrl}
          alt="YouTube Thumbnail"
          width={120}
          height={90}
          className="rounded"
        />
      ) : (
        "No Thumbnail"
      );
    },
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <a href={row.original.link} target="_blank" rel="noopener noreferrer">
        {row.original.link}
      </a>
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
