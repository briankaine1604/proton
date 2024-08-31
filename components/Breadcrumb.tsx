"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import React from "react";

type RouteNames = {
  [key: string]: string;
};

const routeNames: RouteNames = {
  "/": "Home",
  "/components": "Components",
  "/components/breadcrumb": "Breadcrumb",
};

export default function PathTrail() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="pb-5">
      <BreadcrumbList>
        {pathnames.length > 0 ? (
          pathnames.map((pathname, index) => {
            const href = `/${pathnames.slice(0, index + 1).join("/")}`;
            const name = routeNames[href] || pathname;
            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                {index === pathnames.length - 1 ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <BreadcrumbPage>Home</BreadcrumbPage>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
