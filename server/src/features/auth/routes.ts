import { authController } from "./handlers";
import { validate } from "@/shared/middlewares";
import { Router } from "express";
import { loginSchema, signupSchema } from "./schemas";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/signup", validate(signupSchema), authController.signup);
