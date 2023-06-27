import { Route, Routes } from "react-router";
import { IssueDetails } from "./IssueDetails";
import { CreateIssue } from "./CreateIssue";

export const IssueRoutes = () => {
  return (
    <Routes>
      <Route path=":issueId" element={<IssueDetails />} />
      <Route path="new" element={<CreateIssue />} />
    </Routes>
  );
};
