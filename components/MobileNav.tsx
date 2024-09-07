"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Props = {};

export default function MobileNav({}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="size-8 z-50" />
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="w-full h-full bg-gradient-to-b via-[#f7f8fa] to-white from-[#e2e8f0]"
      >
        <Link href={"/"}>
          <div className="flex items-center mt-10 mb-10">
            <Image
              src="/logo.svg"
              alt="Proton company logo"
              width="100"
              height="100"
              className=""
            />
          </div>
        </Link>
        <NavLinks className=" gap-y-8" />
      </SheetContent>
    </Sheet>
  );
}
