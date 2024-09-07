"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import parse from "html-react-parser";
import Truncate from "react-truncate-markup";
import { CellAction } from "./cell-action";

export type FAQColumn = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
};

export const columns: ColumnDef<FAQColumn>[] = [
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "answer",
    header: "Answer",
    cell: ({ row }) => (
      <Truncate lines={2}>
        <div>{parse(row.original.answer)}</div>
      </Truncate>
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
