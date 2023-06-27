import { Request, Response } from "express";
export const unknowEndpoint = (_req: Request, res: Response) => {
  return res.sendStatus(404);
};
