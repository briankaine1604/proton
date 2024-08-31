import { db } from "@/lib/db";
import { TeamMemberForm } from "./components/form";

const ProjectPost = async ({ params }: { params: { teamId: string } }) => {
  const data = await db.teamMember.findUnique({
    where: {
      id: params.teamId,
    },
  });

  if (data) {
    // Convert the Decimal fields to strings or numbers
    return <TeamMemberForm initialData={data} />;
  }

  return <TeamMemberForm />;
};

export default ProjectPost;
