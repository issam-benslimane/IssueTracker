import { TUser } from "@/features/users";
import axios from "@/utils/api";
import { TLogin, TRegister } from "../types";

export const login = async (
  credentials: TLogin
): Promise<{ user: TUser; token: string }> => {
  const response = await axios.post("/login", credentials);
  return response.data;
};

export const register = async (
  data: TRegister
): Promise<{ user: TUser; token: string }> => {
  const response = await axios.post("/register", data);
  return response.data;
};

export const getCurrentUser = async (): Promise<TUser> => {
  const response = await axios.get("/user");
  return response.data;
};
