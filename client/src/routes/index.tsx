import { useAuth } from "@/features/auth";
import { ProjectRoutes } from "@/features/projects";
import { Route, Routes } from "react-router";

export const AppRoutes = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return null;
  return (
    <Routes>
      <Route path="projects/*" element={<ProjectRoutes />} />
    </Routes>
  );
};
