import { Route, Routes } from "react-router";
import { Board } from "./Board";
import { Settings } from "./Settings";
import { IssueRoutes } from "@/features/issues";
import { ProjectProvider } from "../providers";

export const ProjectRoutes = () => {
  return (
    <ProjectProvider>
      <Routes>
        <Route path="">
          <Route path="board" element={<Board />}>
            <Route path="issues/*" element={<IssueRoutes />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </ProjectProvider>
  );
};
