"use client";
import React, { useState } from "react";

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#820001]/80 text-white text-center py-2 px-4 w-full flex justify-center">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto gap-x-2">
        <p className="text-sm">
          📢 Exciting Offer: Get 10% off on your first property purchase!{" "}
          <a href="#" className="underline font-semibold">
            Learn More
          </a>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
