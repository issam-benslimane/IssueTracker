import { useQuery } from "react-query";
import { getIssues } from "../api";

export const useGetIssues = (projectId: string) => {
  return useQuery(["projects", projectId, "issues"], () =>
    getIssues(projectId)
  );
};
