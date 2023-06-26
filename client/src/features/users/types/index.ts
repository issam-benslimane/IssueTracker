export type TUser = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

export type UserParams = {
  projectId?: string;
  issueId?: string;
};
