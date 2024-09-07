import { ExternalLinks, News, Project } from "@/types";
import axios from "axios";

// Use a relative URL for the API endpoint
const URL = "/api/news";

export const getNews = async (): Promise<News[]> => {
  const res = await axios.get(URL);

  return res.data;
};
