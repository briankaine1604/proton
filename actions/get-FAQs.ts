import { FAQS } from "@/types";
import axios from "axios";

const URL = `${
  process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3000"
}/api/FAQ`;

export const getFAQs = async (): Promise<FAQS[]> => {
  const res = await axios.get(`${URL}`);

  return res.data;
};
