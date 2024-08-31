"use client";
import React, { useEffect, useState } from "react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import Image from "next/image";

import { BlogPost } from "@/types";
import { getNewsArticles } from "@/actions/getNewsArticles";

type Props = {};

export function News({}: Props) {
  const [newsArticles, setNewsArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const articles = await getNewsArticles();
        setNewsArticles(articles);
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
      }
    };

    fetchNewsArticles();
  }, []);

  return (
    <div className="min-h-screen w-full pb-20">
      <Container>
        <section>
          <Heading className="text-4xl pb-10 text-center">
            News and Articles
          </Heading>
          <div className="flex lg:justify-between flex-wrap gap-10 justify-center items-start">
            {newsArticles.map((article, index) => (
              <article
                key={index}
                className="bg-white shadow-md rounded-lg w-[500px] h-[400px] overflow-hidden hover:shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.subtitle}</p>
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${article.slug}`}
                    className="text-[#820001] hover:underline"
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
