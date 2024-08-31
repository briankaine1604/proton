"use client";
import React, { useEffect, useState } from "react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import Image from "next/image";
import { getHomeProjects } from "@/actions/get-home-projects";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Importing icons

type Project = {
  id: string;
  name: string;
  address?: string;
  images: { id: string; url: string }[];
};

type Props = {
  projects: Project[];
};

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectList = await getHomeProjects();
        setProjects(projectList);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return <Projects projects={projects} />;
}

function Projects({ projects }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  // Ensure there are projects to display
  if (projects.length === 0) {
    return <p>No projects available.</p>;
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="relative py-20 w-full bg-[#f7f8fa] text-lg">
      <Container>
        <div className="relative z-10 bg-white shadow-lg rounded-lg p-10">
          <Heading className="text-4xl mb-6 text-center font-bold text-gray-800">
            Browse our Latest Projects
          </Heading>
          <p className="text-center text-black/70 mb-12">
            Discover the latest projects from Proton that showcase our
            commitment to excellence and innovation in real estate.
          </p>
          <div className="h-2 w-32 bg-[#820001] mx-auto mb-8 rounded-full"></div>

          {/* Image Carousel with Overlay */}
          <div className="relative flex items-center justify-center h-[400px] overflow-hidden rounded-lg border-2 border-gray-200">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-0 z-20 p-3 bg-[#820001] text-white rounded-full transition-transform duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center aspect-square transition-all duration-500 ease-in-out">
              <Image
                fill
                src={currentProject.images[0]?.url || "/placeholder.jpg"} // Fallback to placeholder
                alt={currentProject.name || "Project Image"}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                <h2 className="text-xl font-bold">{currentProject.name}</h2>
                {currentProject.address && (
                  <p className="text-sm">{currentProject.address}</p>
                )}
              </div>
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-0 z-20 p-3 bg-[#820001] text-white rounded-full transition-transform duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
