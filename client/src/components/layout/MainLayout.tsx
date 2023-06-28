import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <main className="py-5">{children}</main>
    </div>
  );
};
