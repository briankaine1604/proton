import { Project } from "@/types";
import axios from "axios";

// Use a relative URL for the API endpoint
const URL = "/api/home-projects";

export const getHomeProjects = async (): Promise<Project[]> => {
  const res = await axios.get(URL);

  return res.data;
};
