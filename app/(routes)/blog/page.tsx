"use client";
import { getBlogs } from "@/actions/get-blogs";
import { BlogPost, CategoryData } from "@/types";
import qs from "query-string";
import { useEffect, useState } from "react";

import { getCategories } from "@/actions/getCategories";
import Container from "@/components/MaxWidthWrapper";
import { BlogCard } from "@/components/blog-card";

const Page = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Start loading
      const query = qs.stringify({ search, category });
      const filteredBlogs = await getBlogs(query);
      setBlogs(filteredBlogs);
      setLoading(false); // Stop loading
    };

    fetchBlogs();
  }, [search, category]);

  return (
    <main className="h-full w-full min-h-screen pt-20 bg-gradient-to-b via-[#f7f8fa] to-white from-[#e2e8f0] pb-10">
      <Container>
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mt-5">
            Insights & Articles
          </h1>
          <p className="text-xl text-gray-600 mt-4 mx-auto max-w-2xl">
            Stay updated with the latest trends and insights in the real estate
            world. Explore our blog posts to gain valuable knowledge and tips.
          </p>
          <div className="mt-8 w-16 h-1 mx-auto bg-[#820001] rounded"></div>
        </div>

        <div className="mb-5 flex justify-center">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820001]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex justify-center mb-20">
          <select
            className="
              px-6 py-2 
              border border-gray-300 
              rounded-lg 
              focus:outline-none 
              focus:ring-2 focus:ring-[#820001] 
              bg-white 
              text-gray-700 
              hover:border-[#820001] 
              transition 
              duration-300
              shadow-sm
              w-full max-w-xs
            "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value} className="shadow">
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Render Skeletons if loading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <BlogCard key={index} isLoading={true} />
              ))
            : blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
        </div>
      </Container>
    </main>
  );
};

export default Page;
