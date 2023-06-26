import { usersMapper } from "../users";

const toJSON = (issue: any) => {
  if (issue.reporter) {
    issue.reporter = usersMapper.toJSON(issue.reporter);
  }
  if (issue.assignees) {
    issue.assignees = issue.assignees.map(usersMapper.toJSON);
  }
  issue.status = deleteUnderscores(issue.status);
  return issue;
};

const deleteUnderscores = (str: string) => {
  return str.replace(/_/g, " ");
};

export const issuesMapper = { toJSON };
