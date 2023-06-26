import { useQuery } from "react-query";
import { getIssue } from "../api";

export const useGetIssue = (projectId: string, issueId: string) => {
  return useQuery(["projects", projectId, "issues", issueId], () =>
    getIssue(projectId, issueId)
  );
};
