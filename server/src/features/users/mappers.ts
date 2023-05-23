import { omit } from "@/shared/utils";

const toJSON = (user: any) => {
  return omit(user, "passwordHash");
};

export const usersMapper = { toJSON };
