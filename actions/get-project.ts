import { Project } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL!}/api/projects`;

export const getProject = async (id: string): Promise<Project> => {
  try {
    const res = await axios.get(`${URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch project data");
  }
};
