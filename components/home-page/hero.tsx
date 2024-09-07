"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "../MaxWidthWrapper";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const textContainerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delay: 0.5 } },
};

const textVariantLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 100 },
  },
};

const textVariantRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 100 },
  },
};

const textVariantScale = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", stiffness: 100 },
  },
};

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 80 },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const svgVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 0.1,
    y: [20, 0, 20],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as "reverse", // Explicitly cast the repeatType
    },
  },
};

export function Hero({}: Props) {
  const router = useRouter();
  return (
    <main className="relative min-h-screen h-full w-full bg-gradient-to-b via-[#f7f8fa] to-white from-[#e2e8f0] flex justify-center items-center overflow-hidden sm:pt-10 lg:pt-0 pt-0">
      {/* Decorative Geometric Shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-[#820001] rounded-full top-[-100px] left-[-100px]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute w-[200px] h-[200px] bg-[#820001] rounded-full bottom-[-100px] right-[-100px]"
      />

      {/* SVG Decorations */}
      <motion.svg
        initial="hidden"
        animate="visible"
        variants={svgVariants}
        className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] fill-current text-[#820001] top-[90px] right-[10px] md:right-[150px]"
        viewBox="0 0 512 502.981"
      >
        <path d="M168.981 251.902v-75.541c-27.806 10.694-45.562-19.993-26.111-41.351L313.714 1.655c2.215-2.037 5.628-2.248 8.083-.33l171.233 133.12c.27.206.512.417.748.688 21.681 23.303-1.199 54.078-27.484 41.647v106.289c-5.064.481-10.272 1.472-15.583 3.034a30.35 30.35 0 00-1.187.355V169.416c0-3.026-117.456-95.872-130.422-105.96-13.739 10.448-133.356 102.545-133.356 106.436v83.769a173.07 173.07 0 00-4.661-1.018 29.505 29.505 0 00-5.292-.582l-6.812-.159zM0 262.132h80.012l-4.551 196.777H0V262.132zm97.951 180.886l3.805-163.332 73.463 1.714c31.014 6.309 61.765 23.918 92.454 44.255l57.061 1.329c25.793 2.157 38.71 28.649 13.219 45.265-20.359 14.204-46.733 12.76-73.731 9.703-18.635-1.354-20.038 23.709-.566 24.25 6.74.678 14.136-.731 20.554-.589 33.773.754 61.742-5.053 79.386-31.335l9.023-19.774 85.859-40.105c42.802-12.997 71.95 32.141 39.94 62.302C435.901 420 371.987 455.34 306.815 483.565c-47.5 27.398-94.312 25.34-140.509-3.273l-68.355-37.274zm244.674-251.445c-2.206 1.2-4.962.385-6.146-1.807a4.52 4.52 0 011.822-6.147c10.427-5.658 15.286-12.974 16.262-20.128.519-3.823-.074-7.658-1.51-11.213-1.467-3.599-3.792-6.872-6.739-9.509-5.733-5.124-13.774-7.821-22.174-5.732-3.405.844-6.353 2.547-8.93 4.948-2.741 2.546-5.11 5.88-7.184 9.819a4.538 4.538 0 01-6.117 1.911 4.539 4.539 0 01-1.911-6.118c2.548-4.828 5.524-8.975 9.05-12.263 3.689-3.421 7.968-5.881 12.946-7.11 11.552-2.858 22.557.786 30.377 7.777 3.97 3.555 7.124 7.983 9.11 12.87 1.999 4.933 2.814 10.354 2.058 15.849-1.348 9.805-7.628 19.64-20.914 26.853zm-34.747 35.799c-17.181-23.076-17.596-44.937 3.258-65.259l-15.018-8.294c-12.027-4.68-34.096 29.815-25.565 39.028l11.701 17.359-2.414 5.036c-.667 1.495-.015 2.548 1.615 3.273l1.584.43-24.676 54.478 6.161 13.136 12.322-3.628 3.17-6.161-3.036-5.688 6.694-1.436 1.555-3.022-3.494-5.333 2.296-4.458 6.68-.844 2.176-4.221-3.732-4.873 2.385-4.621 6.812-1.111 3.512-11.939 1.571.858c2.725 1.659 4.132.593 4.443-2.71zm32.333 14.47l1.228 11.155-6.295 2.488-1.318 4.933 4.592 3.895-1.2 4.488-6.221 2.192-1.273 4.74 4.457 4.369-.859 3.214-6.116 2.769 4.087 4.815-1.761 6.562-.645.351a70.339 70.339 0 00-1.736-.167l-.007.094a29.266 29.266 0 00-1.835-.094l-11.474-.268-3.959-5.19 10.681-55.603-3.985-1.067a1.556 1.556 0 01-1.096-1.895l1.674-6.236c-12.056-9.138-18.025-24.957-13.878-40.465 5.331-19.92 25.445-31.948 45.382-27.475a14.668 14.668 0 01-.075 3.228c-.37 2.696-1.54 5.467-3.702 8.147-.296.355-.608.726-.934 1.082a13.653 13.653 0 00-14.055 10.101 13.611 13.611 0 00.296 8.043c.208.889.548 1.748.993 2.591a10.478 10.478 0 004.398 4.325 13.887 13.887 0 003.955 1.778c7.154 1.91 14.485-2.207 16.618-9.242a44.529 44.529 0 005.658-5.999c3.14-4.043 5.288-8.339 6.561-12.709 8.651 9.332 12.456 22.766 8.917 35.978-4.147 15.507-17.255 26.23-32.244 28.112l-1.674 6.235a1.557 1.557 0 01-1.896 1.097l-1.259-.372zM466.653 15.384v66.784l-51.411-33.923V15.384h51.411z" />
      </motion.svg>
      <motion.svg
        initial="hidden"
        animate="visible"
        variants={svgVariants}
        className="absolute w-[80px] h-[80px] md:w-[150px] md:h-[150px] fill-current text-[#820001] top-[200px] left-[50px] md:left-[200px]"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="m211 452h90v-392h-90zm30-30v-31h30v31zm30-211v30h-30v-30zm-30-30v-30h30v30zm30 90v30h-30v-30zm0 60v30h-30v-30zm0-241v31h-30v-31z" />
          <path d="m361 173.899v-143.899h30v-30h-270v30h30v91h-151v391h512v-398.102zm-210-22.899v271h-121v-271zm-121 331v-30h121v30zm151 0v-452h150v452zm301 0h-121v-30h91v-30h-91v-30h91v-30h-91v-30h91v-30h-91v-30h91v-30h-91v-35.82l121-48.08z" />
          <path d="m91 362h30v30h-30z" />
          <path d="m91 302h30v30h-30z" />
          <path d="m91 242h30v30h-30z" />
          <path d="m91 182h30v30h-30z" />
        </g>
      </motion.svg>

      {/* <motion.svg
        initial="hidden"
        animate="visible"
        variants={svgVariants}
        className="absolute w-[100px] h-[100px] fill-current text-[#820001] bottom-[50px] left-[100px]"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.79 4 4 4s4-1.79 4-4c0-3.31-2.69-6-6-6zm6 20v-2H6v2H4v-2H3c-1.11 0-2-.89-2-2v-4c0-.55.45-1 1-1h4v-1H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h1V4c0-.55.45-1 1-1h2V2h8v1h2c.55 0 1 .45 1 1v2h1c1.11 0 2 .89 2 2v4c0 1.11-.89 2-2 2h-1v1h4c.55 0 1 .45 1 1v4c0 1.11-.89 2-2 2h-1v2h-2z" />
      </motion.svg> */}

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textContainerVariant}
          className="flex flex-col items-center text-center gap-y-8"
        >
          <motion.h1
            variants={textVariantLeft}
            className=" text-6xl md:text-8xl font-extrabold text-[#820001] tracking-tight"
          >
            Shaping the Future
          </motion.h1>
          <motion.h2
            variants={textVariantRight}
            className=" text-5xl md:text-7xl font-semibold text-gray-800 tracking-tight"
          >
            of Real Estate
          </motion.h2>
          <motion.p
            variants={textVariantScale}
            className="text-xl md:text-2xl text-black/80 max-w-2xl mt-4"
          >
            We lead in innovative property development, creating exceptional
            spaces that define modern living. Discover our visionary projects
            designed to inspire and elevate your lifestyle.
          </motion.p>
          <motion.div whileHover="hover" className="mt-8">
            <Button
              className="px-8 py-4"
              onClick={() => router.push("/projects")}
            >
              Explore Projects
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </main>
  );
}
