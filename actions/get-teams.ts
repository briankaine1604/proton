import { Project, Team } from "@/types";
import axios from "axios";

// Use a relative URL for the API endpoint
const URL = "/api/team";

export const getTeams = async (): Promise<Team[]> => {
  const res = await axios.get(URL);

  return res.data;
};
