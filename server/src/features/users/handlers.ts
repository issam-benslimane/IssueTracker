import { NextFunction, Request, Response } from "express";

const getUser = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    id;
  } catch (error) {
    next(error);
  }
};

export const usersController = { getUser };
