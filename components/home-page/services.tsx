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
      }, 1000); // Duration of exit animation
    }, 5000); // Interval duration

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-14 bg-gray-900 text-white overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-particles"></div>
      </div>

      <Container className="relative z-10">
        <Heading className="text-5xl mb-5 text-center font-bold text-gray-100">
          Our Services
        </Heading>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto text-gray-300">
          Discover the innovative services we offer, tailored to your needs.
        </p>

        {/* Carousel of Services */}
        <div className="relative flex justify-center items-center">
          <div
            className={`service-item ${animationClass}`}
            key={currentServiceIndex}
          >
            <Image
              src={servicesData[currentServiceIndex].icon}
              alt={servicesData[currentServiceIndex].title}
              width={80}
              height={80}
              className="mx-auto"
            />
            <h1 className="mt-4 text-2xl font-semibold">
              {servicesData[currentServiceIndex].title}
            </h1>
            <p className="mt-4 text-lg text-gray-400">
              {servicesData[currentServiceIndex].description}
            </p>
            {/* <a href="#" className="text-blue-400 hover:underline mt-4 block">
              Learn More
            </a> */}
          </div>
        </div>
      </Container>

      {/* Decorative Elements */}
      <div className="absolute top-[-5rem] left-[-5rem] w-48 h-48 bg-[#820001]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-60 h-60 bg-[#820001]/30 rounded-full blur-3xl"></div>
    </section>
  );
}
