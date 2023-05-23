import { TUser } from "@/features/users";
import { ProjectCategory } from "../constants";
import { TIssue } from "@/features/issues";

export type TProject = {
  id: number;
  name: string;
  url: string;
  description: string;
  category: ProjectCategory;
  createdAt: Date;
  updatedAt: Date;
  leadId: number;
  lead: TUser;
  users: TUser[];
  issues: TIssue[];
};
