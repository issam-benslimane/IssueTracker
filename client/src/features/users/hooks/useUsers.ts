import { useQuery } from "react-query";
import { UserParams } from "../types";
import { getUsers } from "../api";

export const useUsers = (params?: UserParams) => {
  return useQuery(["users", params], () => getUsers(params));
};
