import * as dotenv from "dotenv";
import { z } from "zod";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const schema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  SECRET: z.string(),
});

const parseEnv = schema.parse(process.env);

export const env = {
  port: parseEnv.PORT,
  node_env: parseEnv.NODE_ENV,
  jwt: {
    secret: parseEnv.SECRET,
  },
};
