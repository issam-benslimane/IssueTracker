import { useEffect, useState } from "react";
import { TIssue } from "../types";
import axios from "@/utils/api";
import { CanceledError } from "axios";

export const useIssues = (projectId: number) => {
  const [issues, setIssues] = useState<TIssue[]>();

  const getIssues = async (signal: AbortSignal) => {
    const result = await axios.get(`projects/${projectId}/issues`, { signal });
    setIssues(result.data);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    getIssues(signal).catch((err) => {
      if (!(err instanceof CanceledError)) throw err;
    });
    return () => controller.abort();
  }, [projectId]);

  return { issues, setIssues };
};
