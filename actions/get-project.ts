import { Project } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL!}/api/projects`;

export const getProject = async (id: string): Promise<Project> => {
  const res = await fetch(`${URL}/${id}`, {
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch project data");
  }

  return res.json();
};
