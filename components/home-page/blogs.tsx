"use client";

import React, { useEffect, useState } from "react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import { BlogPost } from "@/types";
import { getNewsArticles } from "@/actions/getNewsArticles";
import { BlogCard } from "../blog-card";
import { getHomeBlogs } from "@/actions/get-blogs";

type Props = {};

export function Blogs({}: Props) {
  const [newsArticles, setNewsArticles] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNewsArticles = async () => {
      try {
        const articles = await getHomeBlogs();
        setNewsArticles(articles);
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsArticles();
  }, []);

  return (
    <div className="min-h-screen w-full pb-10">
      <Container>
        <section>
          <Heading className="text-4xl font-bold pb-10 text-center">
            News and Articles
          </Heading>
          <div className="flex lg:justify-between flex-wrap gap-10 justify-center items-start">
            {isLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px]"
                  >
                    <BlogCard isLoading={true} />
                  </div>
                ))
              : newsArticles.map((article) => (
                  <div
                    key={article.id}
                    className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px]"
                  >
                    <BlogCard blog={article} />
                  </div>
                ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
