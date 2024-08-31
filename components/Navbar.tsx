"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

export default function Navbar({}: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {announcementVisible && (
        <div className="bg-[#820001]/70 text-white text-center py-2 px-4 w-full flex justify-center fixed top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-40">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto gap-x-2">
            <p className="text-sm">
              📢 Exciting Offer: Get 10% off on your first property purchase!{" "}
              <a href="#" className="underline font-semibold">
                Learn More
              </a>
            </p>
            <button
              onClick={() => setAnnouncementVisible(false)}
              aria-label="Close announcement"
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              ✖
            </button>
          </div>
        </div>
      )}
      <nav
        className={`h-16 fixed w-full ${
          announcementVisible ? "top-10" : "top-0"
        } z-40 transition-shadow duration-300 bg-[#e2e8f0] 
        ${isScrolled ? " border-b border-black/10 shadow-sm" : ""}
      `}
      >
        <Container className="flex items-center justify-between h-full px-4">
          <Link href={"/"}>
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Proton company logo"
                width="100"
                height="100"
                className=""
              />
            </div>
          </Link>
          <div className="hidden md:flex">
            <NavLinks className="gap-x-10 text-gray-800 transition-colors duration-300 " />
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden lg:flex">
            <Button onClick={() => router.push("/contact")}>
              <span>Contact Us</span>
            </Button>
          </div>
        </Container>
      </nav>
    </>
  );
}
