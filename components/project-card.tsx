import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { Project } from "@/types";
import { Button } from "./ui/button";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Image
        src={project.images[0]?.url}
        alt={project.name}
        className="w-full h-48 object-cover"
        width={300}
        height={300}
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          {project.name}
        </h2>
        <p className="text-gray-700 my-4">{project.address}</p>
        <div className="flex justify-between items-center my-2">
          <Badge
            variant={project.inStock ? "inStock" : "destructive"}
            className=""
          >
            {project.inStock ? "In Stock" : "Sold Out"}
          </Badge>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-gray-800 group:transition text-sm"
          >
            <span className="mr-2 ">View Details</span>
            <ArrowRight
              size={24}
              className="group-hover:text-[#820001]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
