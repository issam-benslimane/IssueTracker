import { Kanban } from "@/features/issues";
import { Layout } from "../components/Layout";
import { Outlet, useParams } from "react-router";
import { useProject } from "../hooks";

export const Board = () => {
  const projectId = useParams().projectId as string;
  const { data: project, status } = useProject(projectId);

  if (status !== "success") return null;

  return (
    <Layout>
      <div className="px-10 py-6">
        <header>
          <p className="font-medium text-slate-500">
            Projects / {project.name} / Kanban Board
          </p>
          <h1 className="text-xl font-semibold text-slate-800">Kanban Board</h1>
        </header>
        <Kanban />
      </div>
      <Outlet />
    </Layout>
  );
};
