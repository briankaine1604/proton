import { cn } from "@/lib/utils";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Image as ImageType } from "@/types";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface GalleryTabProps {
  image: ImageType;
}
const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Tab
      className={
        "relative flex aspect-square cursor-pointer items-center bg-white justify-center rounded-md"
      }
    >
      {({ selected }) => (
        <div>
          <span className=" absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            {isLoading && (
              <Skeleton className="aspect-square h-full w-full animate-pulse rounded-md" />
            )}

            <Image
              fill
              src={image.url}
              alt=""
              onLoad={handleLoad}
              className=" object-center object-cover"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          ></span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
