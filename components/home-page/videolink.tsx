"use client";

import { useEffect, useState } from "react";
import { ExternalLinks } from "@/types";
import { getLinks } from "@/actions/get-links";
import Container from "../MaxWidthWrapper";

export const VideoLinksSection = () => {
  const [links, setLinks] = useState<ExternalLinks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getLinks();
        setLinks(data);
      } catch (error) {
        console.error("Failed to fetch links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Function to extract YouTube video ID from the link
  const getYouTubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=|\/videos\/|embed\/|\?v=|\/v\/|watch\?v%3D|\/v%2F|\/shorts\/)([^#\&\?\/\n]+).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <Container>
      <section className="pb-8">
        <div className="container mx-auto px-4">
          {/* Only show the heading if there are links or loading */}
          {(links.length > 0 || loading) && (
            <h2 className="text-4xl font-bold text-center mb-6">
              Latest Videos
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 mb-2"></div>
                      <div className="h-4 bg-gray-300 w-3/4"></div>
                    </div>
                  </div>
                ))
              : links.length > 0 &&
                links.map((link) => {
                  const videoId = getYouTubeId(link.link);

                  return (
                    <div
                      key={link.id}
                      className="bg-white shadow-md rounded-lg overflow-hidden"
                    >
                      {videoId && (
                        <div className="relative w-full h-[250px]">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </Container>
  );
};
