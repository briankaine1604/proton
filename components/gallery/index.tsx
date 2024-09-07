"use client";

import { Tab, TabList, TabPanels, TabGroup, TabPanel } from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import GalleryTab from "./gallery-tab";
import { Skeleton } from "../ui/skeleton";
import ImageModal from "./image-modal";
// Importing the modal component

export interface ImageType {
  id: string;
  url: string;
}

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null); // For modal state

  const handleLoad = () => {
    setIsLoading(false);
  };

  const openModal = (image: ImageType) => {
    setSelectedImage(image); // Open modal with the selected image
  };

  const closeModal = () => {
    setSelectedImage(null); // Close the modal
  };

  return (
    <>
      <TabGroup as="div" className={"flex flex-col gap-x-2"}>
        <TabPanels className={"aspect-video w-full"}>
          {images.map((image) => (
            <TabPanel key={image.id}>
              <div
                className="aspect-square relative w-full sm:rounded-lg overflow-hidden h-[400px] cursor-pointer"
                onClick={() => openModal(image)} // Open modal on click
              >
                {isLoading && (
                  <Skeleton className="aspect-square h-full w-full animate-pulse rounded-md" />
                )}
                <Image
                  fill
                  src={image.url}
                  alt="Image"
                  onLoad={handleLoad}
                  className="object-cover object-center"
                />
              </div>
            </TabPanel>
          ))}
        </TabPanels>
        <div className="mx-auto w-full sm:block lg:max-w-none max-w-[500px] mt-4">
          <TabList className={"grid grid-cols-5 gap-3"}>
            {images.map((image) => (
              <GalleryTab key={image.id} image={image} />
            ))}
          </TabList>
        </div>
      </TabGroup>

      {/* Modal for viewing the large image */}
      {selectedImage && (
        <ImageModal image={selectedImage} closeModal={closeModal} />
      )}
    </>
  );
};

export default Gallery;
