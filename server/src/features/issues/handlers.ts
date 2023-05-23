import { NextFunction, Request, Response } from "express";
import { issuesService } from "./service";
import { issuesMapper } from "./mappers";

const getIssues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = +req.params.projectId;
    const issues = await issuesService.getIssues({ projectId });
    res.status(200).json(issues.map(issuesMapper.toJSON));
  } catch (error) {
    next(error);
  }
};

const getIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const issue = await issuesService.getIssue({ id });
    res.status(200).json(issuesMapper.toJSON(issue));
  } catch (error) {
    next(error);
  }
};

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const reporterId = +req.user.id;
    const projectId = +req.params.projectId;
    const issue = await issuesService.createIssue({
      ...data,
      reporterId,
      projectId,
    });
    res.status(201).json(issuesMapper.toJSON(issue));
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const id = +req.params.id;
    const issue = await issuesService.updateIssue({ id }, data);
    res.status(200).json(issuesMapper.toJSON(issue));
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    await issuesService.deleteIssue({ id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const issuesController = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
};
