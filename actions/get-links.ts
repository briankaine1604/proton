import { ExternalLinks, Project } from "@/types";
import axios from "axios";

// Use a relative URL for the API endpoint
const URL = "/api/link";

export const getLinks = async (): Promise<ExternalLinks[]> => {
  const res = await axios.get(URL);

  return res.data;
};
