import React from "react";
import Image from "next/image";

const WhatsAppButton: React.FC = () => {
  return (
    <div className="fixed bottom-5 left-5 z-50">
      <a
        href="https://wa.me/2347067850835"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex items-center justify-center w-14 h-14 md:w-auto md:px-4 md:py-2 bg-green-700 rounded-full shadow-lg hover:bg-green-800 transition-colors"
      >
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          width={30}
          height={30}
          className="md:mr-2"
        />
        <span className="hidden md:inline text-white font-semibold">
          Reach us on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default WhatsAppButton;
