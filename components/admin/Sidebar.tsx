"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Contact,
  FolderArchive,
  Newspaper,
  NotepadText,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {};

export function Sidebar({}: Props) {
  const pathname = usePathname();
  const links = [
    {
      id: 1,
      href: "/blog",
      name: "Blog",
      icon: <NotepadText className=" size-4" />,
    },
    {
      id: 2,
      href: "/contact",
      name: "Contact list",
      icon: <Contact className=" size-4" />,
    },
    {
      id: 3,
      href: "/project",
      name: "Projects",
      icon: <FolderArchive className="size-4" />,
    },
    {
      id: 4,
      href: "/newsletter",
      name: "Newsletter",
      icon: <Newspaper className=" size-4" />,
    },
    {
      id: 5,
      href: "/team",
      name: "Team members",
      icon: <Users className=" size-4" />,
    },
    {
      id: 6,
      href: "/settings",
      name: "Settings",
      icon: <Settings className=" size-4" />,
    },
  ];
  return (
    <div className="lg:w-[250px] lg:fixed left-0 top-0  lg:shadow-lg h-screen text-xl lg:text-base">
      <div className="flex flex-col pl-10 gap-y-8 pt-12">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Proton company logo"
              width="100"
              height="100"
            />
          </div>
        </Link>
        <Link
          href={"/admin"}
          className={cn(
            "flex gap-x-2 items-center text-gray-500",
            pathname === "/admin" && " text-black font-medium"
          )}
        >
          <PieChart className=" size-4" />
          <span>Dashboard</span>
        </Link>
        {links.map(({ id, href, name, icon }) => (
          <Link
            href={`/admin/${href}`}
            key={id}
            className={cn(
              "flex gap-x-2 items-center text-gray-500",
              pathname.includes(href) && " text-black font-medium"
            )}
          >
            {icon}
            <span> {name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
