import { Issue, IssuePriority, IssueType, Prisma, User } from "@prisma/client";

export type TIssueWhere = Prisma.IssueWhereInput;

export type TIssueWhereUnique = Prisma.IssueWhereUniqueInput;

export type TIssueCreate = {
  type: IssueType;
  summary: string;
  description: string;
  priority: IssuePriority;
  projectId: string;
  assignees: User[];
  reporter: User;
};

export type TIssueUpdateDto = Partial<Issue> & {
  assignees?: User[];
  reporter?: User;
};
