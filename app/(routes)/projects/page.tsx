import { getProjects } from "@/actions/get-projects";
import { EmptyState } from "@/components/emptystate";
import Container from "@/components/MaxWidthWrapper";
import ProjectCard from "@/components/project-card";

const Page = async () => {
  const projects = await getProjects();

  return (
    <main className="h-full w-full min-h-screen pt-20 bg-gradient-to-b via-[#f7f8fa] to-white from-[#e2e8f0] pb-10">
      <Container>
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mt-5">
            Discover Our Exclusive Projects
          </h1>
          <p className="text-xl text-gray-600 mt-4 mx-auto max-w-2xl">
            Dive into our curated selection of real estate developments, where
            innovation meets elegance. Each project is designed to elevate your
            lifestyle.
          </p>
          <div className="mt-8 w-16 h-1 mx-auto bg-[#820001] rounded"></div>
        </div>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export default Page;
