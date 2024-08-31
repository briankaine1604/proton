import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { BlogPost } from "@/types";
import { Button } from "./ui/button";

export const BlogCard: React.FC<{ blog: BlogPost }> = ({ blog }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Image
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-48 object-cover"
        width={300}
        height={300}
        loading={"lazy"}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 text-gray-900">
          {blog.title}
        </h2>
        {blog.subtitle && (
          <p className="text-gray-600 mb-3 text-sm">{blog.subtitle}</p>
        )}
        <div className="flex justify-between items-center my-2">
          <Badge variant="secondary">{/* Category if needed */}</Badge>
          <Button variant={"link"}>
            <Link href={`/blog/${blog.slug}`} className=" ">
              <span className="mr-2">Read More</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
