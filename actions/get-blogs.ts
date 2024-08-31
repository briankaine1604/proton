import { BlogPost } from "@/types";
import axios from "axios";
import queryString from "query-string";

const URL = `${
  process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3000"
}/api/blogs`;

export const getBlogs = async (query: string = ""): Promise<BlogPost[]> => {
  try {
    // Make the API request with the query parameters
    const res = await axios.get(`${URL}?${query}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    throw error;
  }
};
