import { BadRequestError } from "@/shared/utils";
import db from "@/db";
import { TUserCreate, TUserWhere, TUserWhereUnique } from "./types";

const getUsers = async (where: TUserWhere = {}) => {
  const users = await db.user.findMany({ where });
  return users;
};

const getUser = async (where: TUserWhereUnique) => {
  const user = await db.user.findUnique({
    where,
  });
  return user;
};

const createUser = async (props: TUserCreate) => {
  try {
    const user = await db.user.create({ data: props });
    return user;
  } catch (error) {
    throw new BadRequestError("email already exists!");
  }
};

export const usersService = { getUser, getUsers, createUser };
