import { authenticate } from "@/shared/middlewares";
import { usersController } from "./handlers";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get("/", usersController.getUsers);

usersRouter.get("/:id", usersController.getUser);
usersRouter.put("/:id");
