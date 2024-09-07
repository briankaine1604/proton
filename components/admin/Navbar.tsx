"use client";
import React, { useState, useEffect } from "react";
import { UserButton } from "../auth/userButton";
import { SmallNavbar } from "./small-screen-sidebar";

export function Navbar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Update on resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-20 fixed top-0 left-0 right-0 px-5 flex items-center z-50">
      {/* Container for the SmallNavbar */}
      {isMobile && (
        <div className="flex lg:hidden">
          <SmallNavbar />
        </div>
      )}
      <div className="flex-1"></div>
      <div className="flex justify-end">
        <UserButton />
      </div>
    </div>
  );
}
