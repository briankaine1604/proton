import { getProject } from "@/actions/get-project";
import { getProjects } from "@/actions/get-projects";
import Gallery from "@/components/gallery";
import Container from "@/components/MaxWidthWrapper";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const project = await getProject(params.slug);

  return (
    <div className=" bg-white">
      <Container>
        <div className="py-10">
          <div className=" lg:items-start lg:gap-x-8">
            <Gallery images={project.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {/* <Info data={project} /> */}
              <div
                dangerouslySetInnerHTML={{ __html: project.description }}
                className=" space-y-4 text-lg" // Tailwind CSS class to style the content
              />
            </div>
          </div>
          <hr className="my-10" />
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
