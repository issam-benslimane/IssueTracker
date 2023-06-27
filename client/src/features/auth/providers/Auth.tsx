import { TUser } from "@/features/users";
import { createContext, useContext } from "react";
import { getCurrentUser } from "../api";
import { useQuery } from "react-query";

type Props = {
  children: React.ReactNode;
};

type AuthContextValue = {
  currentUser?: TUser;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const { data: currentUser, isLoading } = useQuery(
    "currentUser",
    getCurrentUser,
    { retry: false }
  );

  if (isLoading) return null;
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) throw new Error("USE CONTEXT INSIDE IT'S PROVIDER!");
  return value;
};
