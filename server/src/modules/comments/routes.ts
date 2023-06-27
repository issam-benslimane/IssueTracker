import { Router } from "express";
import { commentsController } from "./handlers";

export const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", commentsController.getComments);
commentsRouter.post("/", commentsController.createComment);

commentsRouter.put("/:id", commentsController.updateComment);
commentsRouter.delete("/:id", commentsController.deleteComment);
