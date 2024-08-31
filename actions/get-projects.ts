import { Project } from "@/types";
import axios from "axios";

const URL = `${
  process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3000"
}/api/projects`;

export const getProjects = async (): Promise<Project[]> => {
  const res = await axios.get(`${URL}`);
  console.log(res.data);
  return res.data;
};
