import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export enum LoginStrategy {
  CREDENTIALS = "credentials",
  GUEST = "guest",
}
