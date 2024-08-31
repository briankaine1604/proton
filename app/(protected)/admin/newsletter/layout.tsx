import { redirect } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // This will redirect any access to this route to the coming soon page
  redirect("/admin/comingsoon");

  return children; // This will never be reached
}
