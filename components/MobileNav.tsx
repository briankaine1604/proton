import React from "react";
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

type Props = {};

export default function MobileNav({}: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="size-8 z-50" />
      </SheetTrigger>
      <SheetContent>
        <NavLinks className=" gap-y-5" />
      </SheetContent>
    </Sheet>
  );
}
