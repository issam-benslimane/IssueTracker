import { BadRequestError } from "@/shared/utils";
import db from "@/db";
import { UserParams } from "./types";
import { Prisma } from "@prisma/client";

const getUsers = async (params: UserParams = {}) => {
  const baseQuery: Prisma.UserFindManyArgs = { where: {} };
  if (params.projectId) {
    baseQuery.where = {
      projects: {
        every: {
          projectId: +params.projectId,
        },
      },
    };
  }

  const users = await db.user.findMany(baseQuery);
  return users;
};

const getUser = async (where: Prisma.UserFindUniqueArgs["where"]) => {
  const user = await db.user.findUnique({
    where,
  });
  return user;
};

const createUser = async (data: Prisma.UserCreateArgs["data"]) => {
  try {
    const user = await db.user.create({ data });
    return user;
  } catch (error) {
    throw new BadRequestError("email already exists!");
  }
};

export const usersService = { getUser, getUsers, createUser };
