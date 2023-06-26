import { useMutation, useQueryClient } from "react-query";
import { deleteIssue } from "../api";

export const useDeleteIssue = (projectId: string, issueId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["projects", projectId, "issues", issueId],
    () => deleteIssue(projectId, issueId),
    {
      onSuccess() {
        queryClient.invalidateQueries(["projects", projectId, "issues"]);
      },
    }
  );
};
