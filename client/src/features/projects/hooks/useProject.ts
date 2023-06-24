import { useQuery } from "react-query";
import { getProject } from "../api";

export const useProject = (projectId: string) => {
  return useQuery(["projects", projectId], () => getProject(projectId));
};
