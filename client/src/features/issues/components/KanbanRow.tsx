import { TIssue } from "../types";
import { Avatar, TUser } from "@/features/users";
import { PriorityIcon } from "./PriorityIcon";
import { TypeIcon } from "./TypeIcon";
import { Link } from "react-router-dom";

type KanbanRowProps = {
  issue: TIssue;
};

export const KanbanRow = ({ issue }: KanbanRowProps) => {
  return (
    <div className="relative rounded-md bg-white p-2 shadow-md">
      <Link to={`issues/${issue.id}`} className="absolute inset-0 z-50" />
      <p className="text-sm text-slate-900">{issue.summary}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex  gap-x-1">
          <TypeIcon type={issue.type} />
          <PriorityIcon priority={issue.priority} />
        </div>
        <Assignees assignees={issue.assignees} />
      </div>
    </div>
  );
};

const Assignees = ({ assignees }: { assignees: TUser[] }) => {
  return (
    <div className="flex flex-row-reverse">
      {assignees.map(({ id, avatarUrl }) => (
        <Avatar key={id} size="sm" avatarUrl={avatarUrl} />
      ))}
    </div>
  );
};
