import axios from "@/utils/api";
import { TIssue } from "../types";

export const getIssues = async (projectId: string): Promise<TIssue[]> => {
  const response = await axios.get(`/projects/${projectId}/issues`);
  return response.data;
};

export const getIssue = async (
  projectId: string,
  issueId: string
): Promise<TIssue> => {
  const response = await axios.get(`/projects/${projectId}/issues/${issueId}`);
  return response.data;
};

export const updateIssue = async (
  projectId: string,
  issueId: string,
  data: TIssue
): Promise<TIssue> => {
  const response = await axios.put(
    `/projects/${projectId}/issues/${issueId}`,
    data
  );
  return response.data;
};

export const deleteIssue = async (projectId: string, issueId: string) => {
  await axios.delete(`/projects/${projectId}/issues/${issueId}`);
};
