import React from "react";
import { Navbar } from "./Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="py-5">{children}</main>
    </div>
  );
};
