"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Container from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getNews } from "@/actions/get-news";
import { News } from "@/types";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews();
        if (newsData.length > 0) {
          setNews(newsData[0]); // Show the first news item
        }
      } catch (error) {
        console.error("Failed to fetch news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {/* Only show the announcement bar when there's news */}
      {announcementVisible && news && (
        <div className="bg-[#820001]/70 text-white text-center py-2 px-4 w-full flex justify-center fixed top-0 z-50 backdrop-filter backdrop-blur-lg bg-opacity-40 h-14">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto gap-x-2">
            {loading ? (
              <div className="h-5 w-full animate-pulse max-w-xs bg-gray-300 rounded-md z-60" />
            ) : (
              <p className="text-sm">
                📢 {news?.content}{" "}
                {news?.link && (
                  <a
                    href={news.link}
                    className="underline font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                )}
              </p>
            )}

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
        className={`h-16 py-2 items-center flex fixed w-full ${
          announcementVisible && news ? "top-14" : "top-0"
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
              />
            </div>
          </Link>
          <div className="hidden md:flex">
            <NavLinks className="gap-x-10 text-gray-800 transition-colors duration-300" />
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden lg:flex">
            <Button>
              <Link href={"/contact"}>
                <span>Contact Us</span>
              </Link>
            </Button>
          </div>
        </Container>
      </nav>
    </>
  );
}
