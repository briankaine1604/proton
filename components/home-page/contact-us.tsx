import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type Props = {};

export function ContactUs({}: Props) {
  return (
    <div className="h-[500px] w-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        src={"/contact.png"}
        alt="A house"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="bg-white w-4/5 md:w-3/5 min-h-[200px] p-6 rounded-lg shadow-lg z-20 flex flex-col items-center justify-center relative">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#820001]">
            Unlock New Doors in Real Estate with Proton
          </h3>
          <p className="text-lg mb-6 text-gray-700">
            Explore exciting projects and get in touch with us to elevate your
            real estate experience.
          </p>
          <div className="flex gap-x-5 justify-center flex-col md:flex-row gap-y-3">
            <Button size={"lg"}>Explore Projects</Button>
            <Button variant={"inverted"} size={"lg"}>
              <a href="tel:+2347067850835" className="">
                +234 706 785 0835
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
