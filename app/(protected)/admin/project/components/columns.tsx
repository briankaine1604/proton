"use client";

import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { inStockStatus } from "./server/inStockstatus";

export type ProjectColumn = {
  id: string;
  name: string | null;
  address: string | null;
  createdAt: string;
  inStock: boolean;
};

const PublishedSwitch: React.FC<{ row: ProjectColumn }> = ({ row }) => {
  const [isChecked, setIsChecked] = useState(row.inStock);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (checked: boolean) => {
    setIsChecked(checked);

    startTransition(async () => {
      inStockStatus(row.id, checked).then((res) => {
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

export const columns: ColumnDef<ProjectColumn>[] = [
  {
    accessorKey: "name",
    header: "Project name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    header: "In stock",
    cell: ({ row }) => <PublishedSwitch row={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />, // row.original is from tanstack for accessing the original object
  },
];
