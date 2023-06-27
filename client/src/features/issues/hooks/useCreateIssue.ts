import { useMutation, useQueryClient } from "react-query";
import { CreateIssueDto } from "../types";
import { createIssue } from "../api";

export const useCreateIssue = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["projects", projectId, "issues"],
    (data: CreateIssueDto) => createIssue(projectId, data),
    {
      onSuccess() {
        queryClient.invalidateQueries(["projects", projectId, "issues"]);
      },
    }
  );
};
