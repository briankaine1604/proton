import { db } from "@/lib/db";
import { ProjectForm } from "./components/form";

const ProjectPost = async ({ params }: { params: { projectId: string } }) => {
  const data = await db.project.findUnique({
    where: {
      id: params.projectId,
    },
    include: {
      images: true,
    },
  });

  if (data) {
    // Convert the Decimal fields to strings or numbers
    return (
      <ProjectForm
        initialData={{
          ...data,
          price: data.price ? data.price.toNumber() : 0, // Handle null case
        }}
      />
    );
  }

  return <ProjectForm />;
};

export default ProjectPost;
