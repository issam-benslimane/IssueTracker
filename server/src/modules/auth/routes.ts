import { authController } from "./handlers";
import { Router } from "express";
import { loginSchema, signupSchema } from "./schemas";
import { authenticate, validate } from "../common/middlewares";

export const authRouter = Router();

authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post("/signup", validate(signupSchema), authController.signup);

authRouter.get("/me", authenticate, authController.getAuthenticatedUser);
