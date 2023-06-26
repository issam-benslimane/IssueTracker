import { useMutation, useQueryClient } from "react-query";
import { TIssue } from "../types";
import { updateIssue } from "../api";

export const useUpdateIssue = (projectId: string, issueId: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    ["projects", projectId, "issues", issueId],
    (data: TIssue) => updateIssue(projectId, issueId, data),
    {
      onMutate(issue) {
        Object.assign(issue, { status: issue.status.replace(/\s/g, "_") });
      },
      onSuccess() {
        queryClient.invalidateQueries({
          predicate(query) {
            return (
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === "projects" &&
              query.queryKey[1] === projectId &&
              query.queryKey[2] === "issues"
            );
          },
        });
      },
    }
  );
};
