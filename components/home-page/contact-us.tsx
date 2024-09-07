import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

export function ContactUs({}: Props) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden h-[500px] w-full">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        src="/contact.png"
        alt="Exterior view of a house with a welcoming entrance"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="relative z-20 bg-white w-4/5 md:w-3/5 min-h-[200px] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#820001]">
            Unlock New Doors in Real Estate with Proton
          </h3>
          <p className="text-lg mb-6 text-gray-700">
            Explore exciting projects and get in touch with us to elevate your
            real estate experience.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Button size="lg">Explore Projects</Button>
            <Button variant="inverted" size="lg">
              <a
                href="tel:+2347067850835"
                aria-label="Call us at +234 706 785 0835"
              >
                +234 706 785 0835
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
