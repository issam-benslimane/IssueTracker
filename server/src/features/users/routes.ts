import { usersController } from "./handlers";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/");

usersRouter.get("/:id", usersController.getUser);
usersRouter.put("/:id");
