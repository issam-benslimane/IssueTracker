import { mergeUrlParts } from "@/utils/url";
import { TUser, UserParams } from "../types";
import axios from "@/utils/api";

export const getUsers = async (params?: UserParams): Promise<TUser[]> => {
  const path = mergeUrlParts("/users", { params });
  const response = await axios.get(path);
  return response.data;
};
