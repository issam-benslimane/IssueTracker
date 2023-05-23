import "./paths";
import express from "express";
import cors from "cors";
import { env } from "@/config";
import { appRouter } from "./features";
import { handleError, unknowEndpoint } from "./shared/middlewares";

const app = express();
const port = env.port || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", appRouter);

app.use(unknowEndpoint);
app.use(handleError);

app.listen(port, () => console.log("listening to port", port));
