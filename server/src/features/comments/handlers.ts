import { NextFunction, Request, Response } from "express";
import { commentsService } from "./service";

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issueId = +req.params.issueId;
    const issues = await commentsService.getComments({ issueId });
    res.status(200).json(issues);
  } catch (error) {
    next(error);
  }
};

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const userId = +req.user.id;
    const issueId = +req.params.issueId;
    const comment = await commentsService.createcomment({
      ...data,
      userId,
      issueId,
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const id = +req.params.id;
    const comment = await commentsService.updatecomment({ id }, data);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = +req.params.id;
    await commentsService.deletecomment({ id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const commentsController = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};
