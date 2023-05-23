import { Route, Routes } from "react-router";
import { IssueDetails } from "./IssueDetails";

export const IssueRoutes = () => {
  return (
    <Routes>
      <Route path=":issueId" element={<IssueDetails />} />
    </Routes>
  );
};
