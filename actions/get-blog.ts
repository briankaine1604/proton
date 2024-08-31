import { BlogPost, Project } from "@/types";
import axios from "axios";

const URL = `${process.env.NEXT_PUBLIC_API_URL!}/api/blogs/by-slug`;

export const getBlog = async (id: string): Promise<BlogPost> => {
  try {
    const res = await axios.get(`${URL}/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch project data");
  }
};
