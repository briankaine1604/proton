"use client";

import { Tab, TabList, TabPanels, TabGroup, TabPanel } from "@headlessui/react";
import Image from "next/image";

import GalleryTab from "./gallery-tab";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export interface ImageType {
  id: string;
  url: string;
}

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };
  return (
    <TabGroup as="div" className={"flex flex-col gap-x-2"}>
      <TabPanels className={"aspect-video w-full"}>
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className=" aspect-video relative w-full sm:rounded-lg overflow-hidden h-[500px]">
              {isLoading && (
                <Skeleton className="aspect-video h-full w-full animate-pulse rounded-md" />
              )}
              <Image
                fill
                src={image.url}
                alt="Image"
                onLoad={handleLoad}
                className=" object-cover object-center"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className="mx-auto hidden w-full sm:block lg:max-w-none max-w-[500px]">
        <TabList className={"flex gap-x-2"}>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
    </TabGroup>
  );
};

export default Gallery;
