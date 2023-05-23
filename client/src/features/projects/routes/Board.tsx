import { Kanban } from "@/features/issues";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";
import { Outlet } from "react-router";

export const Board = () => {
  return (
    <Layout>
      <div className="px-10 py-6">
        <Header currentPath="Kanban Board" />
        <Kanban />
      </div>
      <Outlet />
    </Layout>
  );
};
