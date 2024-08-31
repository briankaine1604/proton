import React from "react";
import { UserButton } from "../auth/userButton";
import { SmallNavbar } from "./small-screen-sidebar";

type Props = {};

export function Navbar({}: Props) {
  return (
    <div className="h-20 fixed px-5 flex items-center z-50 justify-between w-full">
      <div className="flex lg:hidden">
        <SmallNavbar />
      </div>

      {/* Adjust flex container to ensure UserButton stays on the right */}
      <div className="flex justify-end w-full lg:w-auto">
        <UserButton />
      </div>
    </div>
  );
}
