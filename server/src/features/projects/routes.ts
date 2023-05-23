import { authenticate } from "@/shared/middlewares";
import { Router } from "express";
import { projectsController } from "./handlers";
import { issuesRouter } from "../issues";

export const projectsRouter = Router({ mergeParams: true });

projectsRouter.use(authenticate);

projectsRouter.get("/", projectsController.getProjects);
projectsRouter.post("/", projectsController.createProject);

projectsRouter.get("/:id", projectsController.getProject);
projectsRouter.put("/:id", projectsController.updateProject);

projectsRouter.use("/:projectId/issues", issuesRouter);
