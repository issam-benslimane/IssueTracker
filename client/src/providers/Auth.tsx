import { createContext } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }: Props) => {
  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};
