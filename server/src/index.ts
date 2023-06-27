import express from "express";
import cors from "cors";
import { env } from "./config";
import { handleError, unknowEndpoint } from "./modules/common/middlewares";
import { authRouter } from "./modules/auth";
import { usersRouter } from "./modules/users";
import { projectsRouter } from "./modules/projects";

const app = express();
const port = env.port || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);

app.use(unknowEndpoint);
app.use(handleError);

app.listen(port, () => console.log("listening to port", port));
