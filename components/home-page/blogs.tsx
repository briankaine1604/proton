"use client";

import React, { useEffect, useState } from "react";
import Container from "../MaxWidthWrapper";
import Heading from "../heading";
import { BlogPost } from "@/types";
import { getHomeBlogs } from "@/actions/get-blogs";
import { BlogCard } from "../blog-card";

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
    <div
      className={`w-full pb-10 ${
        newsArticles.length > 0 || isLoading ? "min-h-screen" : ""
      }`}
    >
      <Container>
        <section>
          {/* Only show the heading if there are articles or loading */}
          {(newsArticles.length > 0 || isLoading) && (
            <Heading className="text-4xl font-bold pb-10 text-center">
              News and Articles
            </Heading>
          )}
          <div className="grid md:grid-cols-2 lg:gap-20 gap-10">
            {isLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="w-full">
                    <BlogCard isLoading={true} />
                  </div>
                ))
              : newsArticles.length > 0 &&
                newsArticles.map((article) => (
                  <div key={article.id} className="w-full">
                    <BlogCard blog={article} />
                  </div>
                ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
