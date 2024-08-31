"use client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BlogForm } from "./components/form";

const BlogPost = ({ params }: { params: { blogId?: string } }) => {
  const [initialData, setInitialData] = useState<any>({
    title: "",
    subtitle: "",
    coverImage: "",
    content: "",
    categories: [], // Initialize as an empty array for new posts
  });
  const [categoryOptions, setCategoryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category options (this will be done for both new and existing posts)
        const { data: categoryData } = await axios.get("/api/categories");
        setCategoryOptions(categoryData);

        // If a blogId is present, fetch the blog data
        if (params.blogId) {
          const { data } = await axios.get(`/api/blogs/by-id/${params.blogId}`);
          // Transform categories array to match the expected format
          const categoryIds = data.categories.map(
            (category: any) => category.categoryId
          );
          const transformedData = {
            ...data,
            categories: categoryIds, // Assign the transformed category IDs
          };

          setInitialData(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false); // Set loading to false once all data is fetched
      }
    };

    fetchData();
  }, [params.blogId]);

  const handleCategoryCreate = async (value: string) => {
    try {
      const { data } = await axios.post("/api/categories", { name: value });
      setCategoryOptions((prev) => [...prev, data]);
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen h-full w-full">
        <Loader2 className=" animate-spin size-10" />
      </div>
    ); // Replace this with your loading component
  }

  return (
    <div>
      <BlogForm
        initialData={initialData}
        onCategoryCreate={handleCategoryCreate}
        categoryOptions={categoryOptions}
      />
    </div>
  );
};

export default BlogPost;
