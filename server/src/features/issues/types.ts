import { Prisma } from "@prisma/client";

export type TIssueWhere = Prisma.IssueWhereInput;

export type TIssueWhereUnique = Prisma.IssueWhereUniqueInput;

export type TIssueCreate = Omit<Prisma.IssueUncheckedCreateInput, "status"> & {
  assigneesIds: number[];
};

export type TIssueUpdate = Prisma.IssueUncheckedUpdateInput & {
  assigneesIds?: number[];
};
