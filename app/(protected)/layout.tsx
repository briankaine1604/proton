"use client";
import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { cn } from "@/lib/utils";
import { useSession, getSession } from "next-auth/react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <main className={cn("h-full w-full")}>
        <div className="flex">
          <div className="hidden lg:flex">
            <Sidebar />
          </div>

          <div className="lg:ml-[250px] bg-gray-100/90 w-full h-full min-h-screen flex flex-col">
            <Navbar />
            <div className="pt-24 p-5">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
