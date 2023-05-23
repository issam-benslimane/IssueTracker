import { ProjectRoutes } from "@/features/projects";
import { Route, Routes } from "react-router";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="projects/*" element={<ProjectRoutes />} />
    </Routes>
  );
};
