"use client";
import React from "react";
import Container from "../MaxWidthWrapper";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

export function About({}: Props) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full h-full min-h-screen relative pb-20 text-lg bg-gradient-to-t  to-white from-[#f7f8fa]">
      <Container>
        <motion.main
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="pt-10 text-center"
        >
          <motion.h1
            className="text-4xl mb-8 font-bold text-gray-800"
            variants={fadeInUp}
          >
            Discover Proton
          </motion.h1>

          {/* Section 1: Company Vision */}
          <motion.section
            className="my-16 text-left border-l-4 border-blue-500 pl-6 shadow-lg p-5 rounded-lg"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Vision
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              At Proton, we envision a future where every home in Africa is
              eco-friendly, combining modern technology with sustainability to
              create lasting impact in our communities.
            </p>
          </motion.section>

          {/* Section 2: Company Mission */}
          <motion.section
            className="my-16 text-left border-l-4 border-green-500 pl-6 shadow-lg p-5 rounded-lg"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our mission is to revolutionize real estate in Africa by creating
              sustainable developments that exceed expectations, offering spaces
              that inspire new lifestyles and contribute to Africa&apos;s
              future.
            </p>
          </motion.section>

          {/* Section 3: Core Values */}
          <motion.section
            className="my-16 text-left border-l-4 border-yellow-500 pl-6 shadow-lg p-5 rounded-lg"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We believe in integrity, innovation, and sustainability. These
              values drive us to continuously improve our processes, deliver
              exceptional results, and make a positive difference in the world.
            </p>
          </motion.section>

          {/* Call to Action */}
          <motion.div
            className="flex flex-col md:flex-row gap-y-5 justify-center gap-x-6 mt-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Button variant="inverted" className="text-lg px-6 py-3">
              <Link href="/about" className="flex items-center gap-x-2">
                <span>Explore More</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button variant="default" className="text-lg px-6 py-3">
              Call Us: 07067850835
            </Button>
          </motion.div>
        </motion.main>
      </Container>
    </section>
  );
}
