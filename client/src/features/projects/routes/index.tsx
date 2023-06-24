import { Route, Routes } from "react-router";
import { Board } from "./Board";
import { Settings } from "./Settings";
import { IssueRoutes } from "@/features/issues";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path=":projectId">
        <Route path="board" element={<Board />}>
          <Route path="issues/*" element={<IssueRoutes />} />
        </Route>
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};
