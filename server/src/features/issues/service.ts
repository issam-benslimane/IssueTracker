import db from "@/db";
import {
  TIssueCreate,
  TIssueUpdate,
  TIssueWhere,
  TIssueWhereUnique,
} from "./types";
import { IssueStatus } from "@prisma/client";

const getIssues = async (where: TIssueWhere) => {
  const issues = await db.issue.findMany({
    where,
    include: {
      reporter: true,
      assignees: {
        select: {
          assignee: true,
        },
      },
    },
  });
  return issues.map((issue) => ({
    ...issue,
    assignees: issue.assignees.map((e) => e.assignee),
  }));
};

const getIssue = async (where: TIssueWhereUnique) => {
  const [issue] = await getIssues(where);
  return issue;
};

const createIssue = async ({ assigneesIds, ...props }: TIssueCreate) => {
  const status = IssueStatus.backlog;
  const issue = await db.issue.create({
    data: {
      ...props,
      status,
      assignees: {
        createMany: {
          data: assigneesIds.map((id) => ({ assigneeId: id })),
        },
      },
    },
  });
  return issue;
};

const updateIssue = async (
  where: TIssueWhereUnique,
  { assigneesIds, ...props }: TIssueUpdate
) => {
  const data = props;
  if (assigneesIds)
    Object.assign(data, {
      assignees: {
        updateMany: {
          data: assigneesIds.map((id) => ({ assigneeId: id })),
        },
      },
    });
  const issue = await db.issue.update({ where, data });
  return issue;
};

const deleteIssue = async (where: TIssueWhereUnique) => {
  await db.issue.delete({ where });
};

export const issuesService = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
