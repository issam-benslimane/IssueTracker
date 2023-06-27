import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { BadRequestError, keys } from "../utils";

export function validate(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (keys(req.body).length === 0) return next();
    const parsed = schema.safeParse(req.body);

    if (parsed.success) {
      next();
    } else {
      const errors = parsed.error.issues
        .map((issue) => issue.message)
        .join(", ");
      next(new BadRequestError(errors));
    }
  };
}
