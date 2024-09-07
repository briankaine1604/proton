"use client";

import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserRole } from "@prisma/client";
import { Loader } from "lucide-react";

// Overlay component for users without access rights
const AccessOverlay = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800/70 backdrop-blur-md z-50">
    <div className="bg-white/30 p-10 rounded-xl shadow-lg text-center border border-white/20 backdrop-blur-sm backdrop-filter">
      <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
      <p className="mt-4 text-lg text-gray-200">
        You don&apos;t have the necessary permissions to view this content.
      </p>
      <p className="text-md mt-2 text-gray-300">
        Please contact an administrator to update your role.
      </p>
    </div>
  </div>
);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);

    if (status === "loading") return; // Wait for session to load

    if (session) {
      const userRole = session.user.role;
      if (userRole === UserRole.ADMIN || userRole === UserRole.STAFF) {
        setHasAccess(true); // User has the required role
      }
      setLoading(false); // Session is loaded
    } else {
      setLoading(false); // Ensure loading is set to false even if there's no session
    }
  }, [session, status]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100/90">
        <div className="bg-white p-10 rounded-lg shadow-lg flex items-center">
          <p>Checking your access rights</p>
          <Loader className=" animate-spin size-5 ml-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className={cn("h-full w-full")}>
        <div className="flex flex-row flex-wrap">
          <div className="hidden lg:flex">
            <Sidebar />
          </div>

          <div className="lg:ml-[250px] bg-gray-100/90 w-full h-full min-h-screen flex flex-col">
            <Navbar />
            <div className="pt-24 p-5 relative">
              {!hasAccess && <AccessOverlay />}{" "}
              {/* Show overlay if no access */}
              {children} {/* Render children regardless of access */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
