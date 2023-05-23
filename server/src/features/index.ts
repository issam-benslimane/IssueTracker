import { Router } from "express";
import { usersRouter } from "./users";
import { authRouter } from "./auth";
import { projectsRouter } from "./projects";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/projects", projectsRouter);
