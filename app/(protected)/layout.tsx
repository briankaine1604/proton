"use client";

import { useRouter } from "next/navigation"; // Import the router
import { Navbar } from "@/components/admin/Navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import { cn } from "@/lib/utils";
import { useSession, getSession } from "next-auth/react";
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
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const checkAccess = async () => {
      setLoading(true);
      const updatedSession = await getSession(); // Force session revalidation
      if (!updatedSession) {
        router.push("/auth/login"); // Redirect to login if no session is found
        return;
      }
      if (
        updatedSession.user.role === UserRole.ADMIN ||
        updatedSession.user.role === UserRole.STAFF
      ) {
        setHasAccess(true); // User has the required role
      }
      setLoading(false);
    };

    if (status !== "loading") {
      checkAccess();
    }
  }, [status, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100/90">
        <div className="bg-white p-10 rounded-lg shadow-lg flex items-center">
          <p>Checking your access rights</p>
          <Loader className="animate-spin size-5 ml-2" />
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
