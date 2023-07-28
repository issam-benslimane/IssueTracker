import { AuthRoutes, useAuth } from "@/features/auth";
import { ProjectRoutes } from "@/features/projects";
import { Navigate, Route, Routes } from "react-router";

export const AppRoutes = () => {
  const { currentUser } = useAuth();
  if (!currentUser)
    return (
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    );
  return (
    <Routes>
      <Route path="projects/*" element={<ProjectRoutes />} />
    </Routes>
  );
};
