import { Project } from "@/types";

// Use a relative URL for the API endpoint
const URL = "/api/home-projects";

export const getHomeProjects = async (): Promise<Project[]> => {
  const res = await fetch(URL, {
    next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch home projects");
  }

  return res.json();
};
