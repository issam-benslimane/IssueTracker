import { IssueStatus } from "../constants";
import { TIssue } from "../types";
import { Filters } from "./Filters";
import { keys } from "@/utils/object-keys";
import { KanbanCol } from "./KanbanCol";
import { TUser } from "@/features/users";
import { useFilters, useIssues } from "../hooks";
import { filterIssues } from "../utils";
import { useProject } from "@/features/projects";

type KanbanProps = {
  projectId: number;
  users: TUser[];
};

export const Kanban = () => {
  const currentProject = useProject();
  const { issues } = useIssues(currentProject.id);
  const { filters, ...methods } = useFilters();

  if (!issues) return null;

  return (
    <>
      <Filters filters={filters} {...methods} />
      <div className="grid grid-cols-[repeat(4,minmax(200px,1fr))] gap-4">
        {keys(IssueStatus)
          .map((status) => ({
            status: IssueStatus[status],
            issues: filterByStatus(
              filterIssues(issues, filters),
              IssueStatus[status]
            ),
          }))
          .map((props) => (
            <KanbanCol key={props.status} {...props} />
          ))}
      </div>
    </>
  );
};

function filterByStatus(issues: TIssue[], status: IssueStatus) {
  return issues.filter((issue) => issue.status === status);
}
