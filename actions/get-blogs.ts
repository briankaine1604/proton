import { BlogPost } from "@/types";
import axios from "axios";
import queryString from "query-string";

// Use a relative URL for the API endpoint
const URL = "/api/blogs";

export const getBlogs = async (query: string = ""): Promise<BlogPost[]> => {
  try {
    // Make the API request with the query parameters
    const res = await axios.get(`${URL}?${query}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    throw error;
  }
};

export const getHomeBlogs = async (query: string = ""): Promise<BlogPost[]> => {
  try {
    // Make the API request with the query parameters
    const res = await axios.get("/api/home-blogs");
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch blogs", error);
    throw error;
  }
};
