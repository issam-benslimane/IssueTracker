import axios from "@/utils/api";
import { TProject } from "../types";

export const getProject = async (id: string): Promise<TProject> => {
  const response = await axios.get(`/projects/${id}`);
  return response.data;
};
