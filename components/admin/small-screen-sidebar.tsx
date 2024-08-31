"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export const SmallNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    // Close the sheet when the path changes
    setIsOpen(false);
  }, [pathname]); // Trigger effect when pathname changes

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
