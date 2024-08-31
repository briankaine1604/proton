"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
};

export default function NavLinks({ className }: Props) {
  const pathname = usePathname();
  const Links = [
    { id: 1, name: "About us", link: "/about" },
    { id: 2, name: "Blog", link: "/blog" },
    { id: 3, name: "Projects", link: "/projects" },
    { id: 4, name: "Our Team", link: "/team" },
  ];
  return (
    <div className={cn(`flex flex-col md:flex-row font-medium ${className}`)}>
      {/* <Link
        href={"/"}
        className={cn(
          "transition duration-150 ease-in-out animate-border-b",
          pathname === "/"
            ? "border-b-2 border-black "
            : "border-b-2 border-transparent"
        )}
      >
        Home
      </Link> */}
      {Links.map(({ id, name, link }) => (
        <Link
          key={id}
          href={link}
          className={cn(
            "transition duration-150 ease-in-out animate-border-b",
            pathname.includes(link)
              ? "border-b-2 border-black  "
              : "border-b-2 border-transparent"
          )}
        >
          <span>{name}</span>
        </Link>
      ))}
    </div>
  );
}
