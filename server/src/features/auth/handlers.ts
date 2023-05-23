import { usersMapper } from "../users";
import { authService } from "./service";
import { TLogin, TRegister } from "./types";
import { NextFunction, Request, Response } from "express";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = req.body as TLogin;
    const strategy = req.query.strategy as string;
    const { token, user } = await authService.login(strategy, credentials);
    res.status(200).json({ token, user: usersMapper.toJSON(user) });
  } catch (error) {
    next(error);
  }
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body as TRegister;
    const { token, user } = await authService.signup(data);
    res.status(201).json({ token, user: usersMapper.toJSON(user) });
  } catch (error) {
    next(error);
  }
};

export const authController = { login, signup };
