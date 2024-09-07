"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/MaxWidthWrapper";
import AboutSection from "@/components/AboutSection";
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { TeamSection } from "./components/teamsection";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/about.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[#820001] opacity-50"></div>
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Proton Real Estate Development Limited
            </motion.h1>
            <motion.p
              className="text-xl text-gray-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Breaking down the barriers of property ownership through
              innovation, sustainability, and accessibility.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container>
        <div className="py-16">
          {/* Company Profile */}
          <AboutSection
            title="Company Profile"
            icon={<BuildingOfficeIcon className="w-8 h-8" />}
          >
            <p>
              <span className="font-semibold">
                Proton Real Estate Development Limited (&quot;Proton&quot;)
              </span>{" "}
              is a dynamic and innovative real estate company dedicated to
              making property ownership more accessible and affordable for
              millennials and Gen Z. We strive to create a new generation of
              millionaires through smart, sustainable property investments that
              align with modern lifestyles and technological advancements.
            </p>
          </AboutSection>

          {/* Vision */}
          <AboutSection
            title="Our Vision"
            icon={<GlobeAltIcon className="w-8 h-8" />}
          >
            <p>
              To revolutionize the real estate industry by providing smart,
              eco-friendly homes and investment opportunities that leverage
              modern technology and sustainability, driving positive change in
              communities across Africa.
            </p>
          </AboutSection>

          {/* Mission */}
          <AboutSection
            title="Our Mission"
            icon={<LightBulbIcon className="w-8 h-8" />}
          >
            <p>
              To empower individuals with high-value real estate investments by
              delivering exceptional projects that exceed customer expectations,
              foster financial growth, and contribute to the sustainable
              development of Africa through environmental stewardship and
              economic progress.
            </p>
          </AboutSection>

          {/* Core Values */}
          <AboutSection
            title="Our Core Values"
            icon={<CheckBadgeIcon className="w-8 h-8" />}
          >
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Integrity:</span> We conduct our
                business with the highest ethical standards, ensuring
                transparency and honesty in all our dealings.
              </li>
              <li>
                <span className="font-semibold">Innovation:</span> We embrace
                modern technologies and creative solutions to deliver
                cutting-edge real estate developments.
              </li>
              <li>
                <span className="font-semibold">Sustainability:</span> We are
                committed to eco-friendly practices that protect and preserve
                the environment for future generations.
              </li>
              <li>
                <span className="font-semibold">Excellence:</span> We strive for
                excellence in every project, ensuring quality and customer
                satisfaction at every step.
              </li>
              <li>
                <span className="font-semibold">Accessibility:</span> We aim to
                make property ownership achievable for all by offering
                affordable and flexible investment options.
              </li>
            </ul>
          </AboutSection>

          {/* Our Offerings */}
          <AboutSection
            title="Our Offerings"
            icon={<HandThumbUpIcon className="w-8 h-8" />}
          >
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Smart Homes
                </h3>
                <p>
                  Our properties are equipped with the latest home automation
                  and energy-efficient technologies, providing comfort,
                  convenience, and cost savings.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Eco-Friendly Developments
                </h3>
                <p>
                  We incorporate green building practices in all our projects,
                  ensuring minimal environmental impact and promoting
                  sustainable living.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Investment Opportunities
                </h3>
                <p>
                  We offer substantial returns across various real estate
                  sectors, including residential, commercial, agricultural, and
                  industrial properties.
                </p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  Affordable Property Ownership
                </h3>
                <p>
                  Our flexible payment plans and low entry barriers make it
                  easier for young investors to own and invest in real estate.
                </p>
              </li>
            </ul>
          </AboutSection>

          {/* Our Commitment */}
          <AboutSection
            title="Our Commitment"
            icon={<ChartBarIcon className="w-8 h-8" />}
          >
            <p>
              At Proton, we are dedicated to delivering exceptional value
              through meticulously planned and executed projects that meet the
              highest standards of quality and sustainability. We believe in
              building not just homes, but thriving communities where
              individuals can prosper and achieve financial growth.
            </p>
            <p>
              We adhere strictly to all regulatory standards, including
              registration with the Corporate Affairs Commission (CAC) and
              compliance with the Economic and Financial Crimes Commission’s
              Special Control Unit on Money Laundering (SCUML) as outlined in
              the Money Laundering (Prevention and Prohibition) Act, 2022.
            </p>
          </AboutSection>

          {/* Contact Information */}
          <AboutSection
            title="Get in Touch"
            icon={<PhoneIcon className="w-8 h-8" />}
          >
            <p>
              We&apos;d love to hear from you! Whether you&apos;re interested in
              our projects or have any inquiries, feel free to reach out.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <EnvelopeIcon className="w-6 h-6 text-[#820001] mr-3" />
                <span className="text-lg text-gray-700">
                  protonrealestateng@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-6 h-6 text-[#820001] mr-3" />
                <span className="text-lg text-gray-700">+234 706 785 0835</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-6 h-6 text-[#820001] mr-3" />
                <span className="text-lg text-gray-700">
                  3, Jemide Avenue off Giwa Amu, Airport Road, Benin City, Edo
                  State.
                </span>
              </div>
            </div>
          </AboutSection>

          <TeamSection />

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Join Us in Creating Sustainable Futures
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Become a part of the Proton journey and invest in a future
              that&apos;s sustainable, innovative, and rewarding.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-[#820001] text-white rounded-md text-lg font-medium hover:bg-[#6b0001] transition-colors duration-300"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
