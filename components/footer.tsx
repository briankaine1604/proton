import React from "react";
import Link from "next/link";

import Container from "./MaxWidthWrapper";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

type Props = {};

export function Footer({}: Props) {
  return (
    <div className="bg-gradient-to-b from-[#333333] to-black text-white py-12 lg:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left mb-8 lg:mb-12">
          {/* Logo and Company Info */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 mb-6 lg:mb-0">
            <Link href={"/"} className="flex justify-center lg:justify-start">
              <Image
                src="/logo.svg"
                alt="Proton company logo"
                width="120"
                height="120"
                className="transition-transform duration-300 hover:scale-110"
              />
            </Link>
            <div className="flex flex-col text-center lg:text-left">
              <div className=" font-semibold text-gray-400">Office Address</div>
              <div className=" max-w-[300px]">
                3, Jemide Avenue off Giwa Amu, Airport Road, Benin City, Edo
                state.
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mb-6 lg:mb-0">
            <ul className="flex gap-4 lg:gap-12  lg:text-base font-semibold justify-center lg:justify-start">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#820001] hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#820001] hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/FAQs"
                  className="hover:text-[#820001] hover:underline"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#820001] hover:underline"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#820001] hover:underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-6 border-t border-gray-600"></div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 justify-between items-center">
          <div className="flex flex-col lg:flex-row gap-x-2 items-center">
            <div className="text-gray-400 font-semibold">Office Line</div>
            <div className="hover:text-[#820001] hover:underline">
              07067850835
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-x-2 items-center">
            <div className="text-gray-400 font-semibold">Email us at</div>
            <a
              href="mailto:protonrealestateng@gmail.com"
              className="hover:text-[#820001] hover:underline"
            >
              info@protonrealestate.com
            </a>
          </div>
          <div className="flex gap-4 lg:gap-6 text-lg lg:text-xl">
            <a
              href="https://www.facebook.com/share/am2FdW4hZJ7iuVb5/?mibextid=LQQJ4d"
              aria-label="Facebook"
              className="hover:text-[#820001]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="size-5" />
            </a>

            {/* <a href="#" aria-label="Twitter" className="hover:text-[#820001]">
              <FaTwitter className="size-5" />
            </a> */}
            <a
              href="https://www.instagram.com/protonrealestate.ng?igsh=MWo5cXd3ZDMzbmM5ZA=="
              aria-label="Instagram"
              className="hover:text-[#820001]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="size-5" />
            </a>
            {/* <a href="#" aria-label="LinkedIn" className="hover:text-[#820001]">
              <FaLinkedin className="size-5" />
            </a> */}
          </div>
        </div>

        <div className="my-6 border-t border-gray-600"></div>

        <div className="text-xs lg:text-sm text-gray-400">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6">
            <p className="lg:w-1/2 text-center lg:text-left">
              Proton is duly registered with the Corporate Affairs Commission
              (CAC) and adheres to regulatory standards, including the Economic
              and Financial Crimes Commission’s Special Control Unit on Money
              Laundering (SCUML), as outlined in the Money Laundering
              (Prevention and Prohibition) Act, 2022.
            </p>
            <p className="lg:w-1/2 text-center lg:text-right">
              The information provided is for general purposes only and does not
              constitute an offer to sell or a solicitation to buy any
              securities. All investment opportunities are subject to market
              risks.
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-gray-600"></div>

        <div className="text-center text-xs text-gray-400 gap-y-2 flex flex-col">
          <p>
            Powered by{" "}
            <a
              href="https://www.instagram.com/thecodeshop_ng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#820001] hover:underline"
            >
              TheCodeShop
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} Proton Real Estate. All rights
            reserved.
          </p>
        </div>
      </Container>
    </div>
  );
}
