import axios from "axios";
import { BlogPost } from "@/types";

// Use a relative URL for the API endpoint
const URL = "/api/blogs";

export const getNewsArticles = async (): Promise<BlogPost[]> => {
  try {
    // Make the API request
    const res = await axios.get(URL);

    // Limit the response to at most 2 articles
    const limitedArticles = res.data.slice(0, 2);

    return limitedArticles;
  } catch (error) {
    console.error("Failed to fetch news articles", error);
    throw error;
  }
};
