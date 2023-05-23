import { keys } from "@/utils/object-keys";
import { FilterState } from "../hooks";
import { TIssue } from "../types";

export function filterIssues(issues: TIssue[], filters: FilterState) {
  return issues.filter((issue) => {
    return keys(filters).every((key) => {
      if (key === "search") return issue.summary.includes(filters[key]);
      else if (key === "users" && filters[key].length > 0)
        return issue.assignees.find((assignee) =>
          filters[key].includes(assignee.id)
        );
      else if (key === "recentlyUpdated" && filters[key]) {
        const onDayAgo = Date.now() - 1000 * 60 * 60 * 24;
        return new Date(onDayAgo) < new Date(issue.updatedAt);
      } else return true;
    });
  });
}
