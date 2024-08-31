import { getBlog } from "@/actions/get-blog";
import Container from "@/components/MaxWidthWrapper";
import Image from "next/image";

interface BlogPageProps {
  params: {
    slug: string;
  };
}

const BlogPage: React.FC<BlogPageProps> = async ({ params }) => {
  const blog = await getBlog(params.slug);

  return (
    <div className="bg-gradient-to-b from-[#f7f8fa] to-white min-h-screen">
      <Container>
        <div className="py-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-x-16">
            {/* Blog Cover Image */}
            <div className="w-full lg:w-2/5 h-72 lg:h-96 relative shadow-lg rounded-lg overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="mt-10 lg:mt-0 lg:w-3/5">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {blog.title}
              </h1>
              <p className="text-lg text-gray-500 mt-4">{blog.subtitle}</p>

              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700"
              />
            </div>
          </div>

          <hr className="my-16 border-gray-200" />

          {/* Suggested Products or Related Items */}
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
