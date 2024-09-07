import { getProject } from "@/actions/get-project";
import Gallery from "@/components/gallery";
import Container from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react"; // You can use any icon library you prefer

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const project = await getProject(params.slug);

  return (
    <div className="bg-gradient-to-b from-[#f7f8fa] to-white min-h-screen">
      <Container>
        <div className="py-20">
          <div className="mb-8 flex items-center">
            {/* Back to Projects Button */}
            <Link
              href="/projects"
              passHref
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors text-xl"
            >
              <ArrowLeftCircle className=" text-xl mr-2" />
              <span className=" font-medium">Back to Projects</span>
            </Link>
          </div>

          <div className="lg:flex lg:gap-x-12">
            {/* Gallery Section */}
            <div className="lg:w-1/2">
              <Gallery images={project.images} />
            </div>

            {/* Info Section */}
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="bg-white p-8 shadow-lg rounded-lg">
                {/* Project Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {project.name}
                </h1>

                {/* Project Address (if available) */}
                {project.address && (
                  <p className="text-xl text-gray-800 mb-4">
                    <strong>Location: </strong>
                    {project.address}
                  </p>
                )}

                {/* Project Description */}
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                  className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700"
                />
              </div>
            </div>
          </div>

          <hr className="my-12 border-gray-300" />

          {/* Suggested Products Section (if applicable) */}
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
