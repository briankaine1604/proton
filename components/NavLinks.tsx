"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Props = {
  className?: string;
};

export default function NavLinks({ className }: Props) {
  const pathname = usePathname();
  const Links = [
    { id: 1, name: "About us", link: "/about" },
    { id: 2, name: "Blog", link: "/blog" },
    { id: 3, name: "Projects", link: "/projects" },
  ];

  const resourcesLinks = [{ id: 1, name: "FAQ", link: "/resources/FAQs" }];

  const extraLink = { id: 4, name: "Contact us", link: "/contact" };

  return (
    <div
      className={cn(
        `flex flex-col md:flex-row text-xl md:text-base font-medium ${className}`
      )}
    >
      {Links.map(({ id, name, link }) => (
        <Link
          key={id}
          href={link}
          className={cn(
            "transition duration-150 ease-in-out animate-border-b",
            pathname.includes(link)
              ? "border-b-2 border-black"
              : "border-b-2 border-transparent"
          )}
        >
          <span>{name}</span>
        </Link>
      ))}

      {/* Render extra link only on small screens */}
      <div className="block md:hidden">
        <Link
          href={extraLink.link}
          className={cn(
            "transition duration-150 ease-in-out animate-border-b",
            pathname.includes(extraLink.link)
              ? "border-b-2 border-black"
              : "border-b-2 border-transparent"
          )}
        >
          <span>{extraLink.name}</span>
        </Link>
      </div>

      <Menu as="div" className="relative">
        <MenuButton
          className={cn(
            "inline-flex items-center transition duration-150 ease-in-out animate-border-b",
            pathname.includes("/resources")
              ? "border-b-2 border-black"
              : "border-b-2 border-transparent"
          )}
        >
          <div className="flex items-center">
            <span>Resources</span>
            <ChevronDownIcon className="w-5 h-5 ml-1" />
          </div>
        </MenuButton>

        <MenuItems className="absolute mt-2 w-48 origin-top-right bg-[#820001]/70 backdrop-blur-md text-white border border-gray-200 rounded-md shadow-lg z-50">
          {resourcesLinks.map(({ id, name, link }) => (
            <MenuItem key={id}>
              {({ active }) => (
                <Link
                  href={link}
                  className={cn(
                    "block px-4 py-2 text-sm",
                    active ? "bg-[#820001]/90 rounded-md" : ""
                  )}
                >
                  {name}
                </Link>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
