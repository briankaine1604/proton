"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AboutSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  center?: boolean; // Optional centering
  card?: boolean; // Optional card styling
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  icon,
  children,
  center = false, // Default is false (not centered)
  card = false, // Default is false (no card styling)
}) => {
  return (
    <motion.section
      className={`my-16 ${
        card
          ? "p-6 bg-white shadow-lg rounded-lg  border-gray-200" // Card styling
          : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={`flex items-center mb-6 ${
          center ? "justify-center" : "" // Center the icon and title if `center` is true
        }`}
      >
        <div className={`text-[#820001] mr-4 ${center ? "text-center" : ""}`}>
          {icon}
        </div>
        <h2
          className={`text-3xl font-semibold text-gray-800 ${
            center ? "text-center" : ""
          }`}
        >
          {title}
        </h2>
      </div>
      <div
        className={`text-lg text-gray-600 leading-relaxed space-y-4 ${
          center ? "text-center" : ""
        }`}
      >
        {children}
      </div>
    </motion.section>
  );
};

export default AboutSection;
