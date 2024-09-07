"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Heading from "../heading";
import Container from "../MaxWidthWrapper";

const servicesData = [
  {
    icon: "smart-home.svg",
    title: "Smart Homes",
    description:
      "Fully automated homes equipped with cutting-edge technology for sustainable living.",
  },
  {
    icon: "eco-friendly.svg",
    title: "Eco-Friendly Developments",
    description:
      "Green building practices and water conservation systems that minimize environmental impact.",
  },
  {
    icon: "investment.svg",
    title: "Investment Opportunities",
    description:
      "Explore diverse and lucrative real estate investment options tailored to your goals.",
  },
  {
    icon: "affordable.svg",
    title: "Affordable Property Ownership",
    description:
      "Flexible payment plans and lower entry barriers designed for young investors.",
  },
];

export function Services() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("enter");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("exit");
      setTimeout(() => {
        setCurrentServiceIndex(
          (prevIndex) => (prevIndex + 1) % servicesData.length
        );
        setAnimationClass("enter");
      }, 300); // Shorter exit animation for smooth transition
    }, 5000); // Interval duration

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[450px] bg-gray-900 text-white overflow-hidden backdrop-blur-lg backdrop-filter ">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-particles"></div>
      </div>

      <Container className="relative z-10 flex flex-col items-center pt-10">
        <Heading className="text-4xl mb-5 text-center font-bold text-gray-100">
          Our Services
        </Heading>
        <p className="text-center text-base font-semibold mb-10 max-w-2xl mx-auto text-gray-300">
          Discover the innovative services we offer, tailored to your needs.
        </p>

        {/* Carousel of Services */}
        <div className="relative flex justify-center items-center">
          <div
            className={`service-item transition-opacity duration-500 ${animationClass}`}
            key={currentServiceIndex}
          >
            <Image
              src={servicesData[currentServiceIndex].icon}
              alt={servicesData[currentServiceIndex].title}
              width={50} // Fixed width
              height={50} // Fixed height
              className="mx-auto object-contain" // Ensures proper scaling and positioning
            />
            <h1 className="mt-4 text-xl font-semibold">
              {servicesData[currentServiceIndex].title}
            </h1>
            <p className="mt-4 text-base text-gray-400 max-w-md mx-auto h-28 overflow-hidden">
              {servicesData[currentServiceIndex].description}
            </p>
          </div>
        </div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute top-[-5rem] left-[-5rem] w-48 h-48 bg-[#820001]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-60 h-60 bg-[#820001]/30 rounded-full blur-3xl"></div>
    </section>
  );
}
