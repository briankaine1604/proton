import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { BlogPost } from "@/types";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface BlogCardProps {
  blog?: BlogPost; // Make blog optional for loading state
  isLoading?: boolean; // Add isLoading prop to indicate loading state
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog, isLoading }) => {
  if (isLoading) {
    return (
      <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
        {/* Skeleton for Image */}
        <Skeleton className="w-full h-48" />

        <div className="p-4">
          {/* Skeleton for Title */}
          <Skeleton className="h-6 w-3/4 mb-2" />

          {/* Skeleton for Subtitle */}
          <Skeleton className="h-4 w-2/4 mb-4" />

          {/* Skeleton for Button */}
          <div className="flex justify-between items-center my-2">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group min-h-[400px]">
      <Image
        src={blog?.coverImage || ""}
        alt={blog?.title || "Loading..."}
        className="w-full h-48 object-cover"
        width={300}
        height={300}
        loading={"lazy"}
      />
      <div className="p-4 flex flex-col gap-y-2">
        <h2 className="text-lg font-semibold mb-1 text-gray-900">
          {blog?.title || "Loading..."}
        </h2>
        {blog?.subtitle ? (
          <p className="text-gray-600 mb-3 text-sm">{blog.subtitle}</p>
        ) : (
          <Skeleton className="h-4 w-2/4 mb-4" />
        )}
        <div className="flex justify-between items-center my-2 absolute bottom-5 w-full left-0">
          <Badge variant="secondary" className="ml-4">
            {/* Category if needed */}
          </Badge>
          <Button variant={"link"} className="mr-4">
            <Link
              href={`/blog/${blog?.slug || "#"}`}
              className="flex items-center"
            >
              <span className="mr-2">Read More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
