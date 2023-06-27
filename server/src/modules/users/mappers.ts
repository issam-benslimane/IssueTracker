import { User } from "@prisma/client";
import { omit } from "../common/utils";

const toJSON = (user: User) => {
  return omit(user, "passwordHash");
};

export const usersMapper = { toJSON };
