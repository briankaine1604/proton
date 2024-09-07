"use client";

import React, { useEffect, useState } from "react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import Image from "next/image";
import { getHomeProjects } from "@/actions/get-home-projects";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles

import { Pagination, Navigation, Autoplay } from "swiper/modules";

type Project = {
  id: string;
  name: string;
  address?: string;
  slug: string;
  images: { id: string; url: string }[];
};

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectList = await getHomeProjects();
        setProjects(projectList);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return loading ? (
    <div className="flex justify-center py-20">
      <SkeletonSection />
    </div>
  ) : (
    <Projects projects={projects} />
  );
}

function SkeletonSection() {
  return (
    <div className="w-full max-w-4xl">
      <Skeleton className="h-10 w-3/4 mx-auto mb-6" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
      <Skeleton className="h-2 w-32 mx-auto mb-8 rounded-full" />

      <div className="relative h-[400px] overflow-hidden rounded-lg border-2 border-gray-200">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-3 h-3 rounded-full mx-1" />
        ))}
      </div>

      <div className="flex justify-left mt-8">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

function Projects({ projects }: { projects: Project[] }) {
  return (
    <div className="relative py-20 w-full bg-[#f7f8fa] text-lg">
      <Container>
        <div className="relative z-10  rounded-lg ">
          <Heading className="text-4xl mb-6 text-center font-bold text-gray-800">
            Browse our Latest Projects
          </Heading>
          <p className="text-center text-black/70 mb-12">
            Discover the latest projects from Proton that showcase our
            commitment to excellence and innovation in real estate.
          </p>
          <div className="h-2 w-32 bg-[#820001] mx-auto mb-8 rounded-full"></div>

          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20} // Space between slides
            slidesPerView={1.3} // Show 1 full slide and 30% of the next
            centeredSlides={false} // Align slides to the left
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 5000, // Delay between slides in milliseconds (3 seconds)
              disableOnInteraction: false, // Continue autoplay after user interaction
            }}
            className="image-carousel"
          >
            {projects.map((project) => (
              <SwiperSlide
                key={project.id}
                className="h-full rounded-lg border-2 border-gray-200 overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    fill
                    src={project.images[0]?.url || "placeholder.jpg"}
                    alt={project.name || "Project Image"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Link
                    href={`/projects/${project.slug}`}
                    className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4"
                  >
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    {project.address && (
                      <p className="text-sm">{project.address}</p>
                    )}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-left mt-8">
            <Link href="/projects">
              <Button variant={"link"} className="text-lg">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
