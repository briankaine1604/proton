// actions/get-categories.ts
import axios from "axios";
import { CategoryData } from "@/types";

// Use a relative URL for the API endpoint
const URL = "/api/categories";

export const getCategories = async (): Promise<CategoryData[]> => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};
