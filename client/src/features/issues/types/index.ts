import { TUser } from "@/features/users";
import { IssuePriority } from "../constants";
import { IssueStatus } from "../constants";
import { IssueType } from "../constants";

export type TIssue = {
  id: number;
  type: IssueType;
  summary: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  estimate: number | null;
  timeSpent: number | null;
  timeRemaining: number | null;
  createdAt: Date;
  updatedAt: Date;
  reporterId: number;
  projectId: number;
  reporter: TUser;
  assignees: TUser[];
};
