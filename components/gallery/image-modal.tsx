"use client";

import Image from "next/image";
import { ImageType } from ".";

interface ImageModalProps {
  image: ImageType;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, closeModal }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center"
      onClick={closeModal} // Close modal when clicking on the background
    >
      <div
        className="relative max-w-4xl w-full mx-4 sm:mx-0"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        {/* Close Button */}
        <button
          className="absolute -top-14 right-2 text-white text-3xl p-2 hover:bg-opacity-50 hover:bg-gray-700 rounded-full"
          onClick={closeModal}
        >
          ✖
        </button>

        {/* Image Container */}
        <div className="aspect-video relative">
          <Image
            fill
            src={image.url}
            alt="Large Image"
            className="object-cover object-center rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
