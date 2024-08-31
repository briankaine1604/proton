// actions/get-categories.ts
import axios from "axios";
import { CategoryData } from "@/types";

const URL = `${
  process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3000"
}/api/categories`;

export const getCategories = async (): Promise<CategoryData[]> => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};
