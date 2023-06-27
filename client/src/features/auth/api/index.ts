import { TUser } from "@/features/users";
import axios from "@/utils/api";

export const getCurrentUser = async (): Promise<TUser> => {
  const response = await axios.get("/auth/me");
  return response.data;
};
