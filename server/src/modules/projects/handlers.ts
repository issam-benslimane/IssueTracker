import { NextFunction, Request, Response } from "express";
import { projectsService } from "./service";
import { projectsMapper } from "./mappers";

const getProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await projectsService.getProjects();
    res.status(200).json(projects.map(projectsMapper.toJSON));
  } catch (error) {
    next(error);
  }
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = +req.params.id;
    const project = await projectsService.getProject({ id });
    res.status(200).json(projectsMapper.toJSON(project));
  } catch (error) {
    next(error);
  }
};

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const leadId = +req.user.id;
    const project = await projectsService.createProject({ ...data, leadId });
    res.status(201).json(projectsMapper.toJSON(project));
  } catch (error) {
    next(error);
  }
};

const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const id = +req.params.id;
    const project = await projectsService.updateProject({ id }, data);
    res.status(200).json(projectsMapper.toJSON(project));
  } catch (error) {
    next(error);
  }
};

export const projectsController = {
  getProjects,
  getProject,
  createProject,
  updateProject,
};
