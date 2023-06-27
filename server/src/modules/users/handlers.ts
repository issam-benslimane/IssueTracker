import { NextFunction, Request, Response } from "express";
import { usersService } from "./service";
import { usersMapper } from "./mappers";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.query;
    const users = await usersService.getUsers(params);
    res.status(200).json(users.map(usersMapper.toJSON));
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    id;
  } catch (error) {
    next(error);
  }
};

export const usersController = { getUser, getUsers };
