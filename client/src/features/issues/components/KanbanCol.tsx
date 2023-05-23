import { TIssue } from "../types";
import { IssueStatus } from "../constants";
import { KanbanRow } from "./KanbanRow";

type KanbanColProps = {
  issues: TIssue[];
  status: IssueStatus;
};

export const KanbanCol = ({ issues, status }: KanbanColProps) => {
  const rows = issues.map((issue) => (
    <KanbanRow key={issue.id} issue={issue} />
  ));
  return (
    <div className="rounded-sm bg-slate-100 p-1">
      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap px-1 py-2 text-xs uppercase text-slate-500">
        {status} {issues.length}
      </p>
      <div className="flex flex-col gap-1">{rows}</div>
    </div>
  );
};
