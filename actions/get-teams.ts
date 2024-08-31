import { Project, Team } from "@/types";
import axios from "axios";

const URL = `${
  process.env.NEXT_PUBLIC_API_URL! || "http://localhost:3000"
}/api/team`;

export const getTeams = async (): Promise<Team[]> => {
  const res = await axios.get(`${URL}`);
  console.log(res.data);
  return res.data;
};
