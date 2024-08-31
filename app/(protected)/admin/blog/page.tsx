import Container from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { BlogPostColumn } from "./components/columns";
import { format } from "date-fns";
import { BlogClient } from "./components/client";
import axios from "axios";
import { Category } from "@prisma/client";
import { CategoryData } from "@/types";
import { Trash } from "lucide-react";
import CategoryManager from "./components/category-manager";

const Blogs = async () => {
  const blogs = await db.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const { data: categoryData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
  );

  const formattedBlog: BlogPostColumn[] = blogs.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    coverImage: item.coverImage,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    published: item.published,
  }));
  return (
    <div className="flex-col  mx-auto">
      <div className="flex-1 pt-6 space-y-4">
        <BlogClient data={formattedBlog} />
        <div className=" pt-10">
          <Container>
            <CategoryManager initialCategories={categoryData} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
