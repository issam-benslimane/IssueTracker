import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils";
import { authService } from "../../auth/service";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("authorization");
    if (authHeader) {
      const [schema, token] = authHeader.split(" ");
      if (schema.toLowerCase() === "bearer") {
        req.user = await authService.authenticateToken(token);
        return next();
      }
    }
    next(new UnauthorizedError("Authentication required!"));
  } catch (error) {
    next(error);
  }
}
