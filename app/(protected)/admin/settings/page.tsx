import { DataTable } from "@/components/ui/data-table";
import { Users, columns } from "./components/columns";
import { db } from "@/lib/db";

export default async function SettingsPage() {
  const data = await db.user.findMany({
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
    },
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
