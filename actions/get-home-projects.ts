import { Project } from "@/types";
import axios from "axios";

const URL = `${
  process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3000"
}/api/home-projects`;

export const getHomeProjects = async (): Promise<Project[]> => {
  const res = await axios.get(`${URL}`);

  return res.data;
};
