"use client";

import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import RoleSelect from "./RoleChange";

export type Users = {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original; // Access the user's original data
      return <RoleSelect currentRole={user.role} userId={user.id} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />, // row.original is from tanstack for accessing the original object
  },
];
