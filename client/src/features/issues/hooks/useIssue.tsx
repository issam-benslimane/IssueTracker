import { useEffect, useState } from "react";
import { TIssue } from "../types";
import axios from "@/utils/api";

export const useIssue = (issueId: string) => {
  const [issue, setIssue] = useState<TIssue>();

  const getIssue = async () => {
    const response = await axios.get(`projects/1/issues/${issueId}`);
    setIssue(response.data);
  };

  const updateIssue = (
    changed: { [k in keyof TIssue]: Pick<TIssue, k> }[keyof TIssue]
  ) => {
    setIssue({ ...issue, ...changed });
  };

  updateIssue({ summary: "fdfd" });

  useEffect(() => {
    getIssue();
  }, [issueId]);

  return { issue, setIssue };
};
