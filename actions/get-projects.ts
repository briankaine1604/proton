import { Project } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL!}/api/projects`;

export const getProjects = async (): Promise<Project[]> => {
  const res = await fetch(`${URL}`, {
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
};
