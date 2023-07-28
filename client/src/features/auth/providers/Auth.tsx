import { TUser } from "@/features/users";
import { createContext, useContext } from "react";
import { getCurrentUser } from "../api";
import { useQuery, useQueryClient } from "react-query";

type Props = {
  children: React.ReactNode;
};

type AuthContextValue = {
  currentUser?: TUser;
  updateCurrentUser: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const { data: currentUser, isLoading } = useQuery(
    "currentUser",
    getCurrentUser,
    { retry: false }
  );

  const updateCurrentUser = () => {
    queryClient.invalidateQueries("currentUser");
  };

  if (isLoading) return null;
  return (
    <AuthContext.Provider value={{ currentUser, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("USE CONTEXT INSIDE IT'S PROVIDER!");
  return value;
};
