import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const roboto = Roboto({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Proton real estate development",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn(roboto.className, "h-full w-full")}>
          <div className="">{children}</div>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
