import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils";
import { authService } from "@/features/auth";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("authorization");
    if (authHeader) {
      const [schema, token] = authHeader.split(" ");
      if (schema.toLowerCase() === "bearer") {
        req.user = await authService.authenticateToken(token);
        return next();
      }
    }
    next(new UnauthorizedError("Please authenticate!"));
  } catch (error) {
    next(error);
  }
};
