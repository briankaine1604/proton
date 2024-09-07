"use client";

import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logoutButton";
import { ChevronDown, LogOut } from "lucide-react";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <div className="flex flex-col text-sm text-right mr-5">
          <div>{user?.name}</div>
          <div className=" font-thin text-gray-500 text-xs">{user?.email}</div>
        </div>
        <Avatar>
          <AvatarImage src={user?.image || ""} />

          <AvatarFallback className="bg-sky-500 text-white">
            <FaUser />
          </AvatarFallback>
        </Avatar>
        <ChevronDown className=" size-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <LogOut className=" w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
