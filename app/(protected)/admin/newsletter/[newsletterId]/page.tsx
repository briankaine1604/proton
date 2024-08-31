import { db } from "@/lib/db";
import { BlogForm } from "./components/form";

const BlogPost = async ({ params }: { params: { blogId: string } }) => {
  const data = await db.blogPost.findUnique({
    where: {
      id: params.blogId,
    },
  });
  return <BlogForm initialData={data} />;
};

export default BlogPost;
