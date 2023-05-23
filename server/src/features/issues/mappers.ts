import { usersMapper } from "../users";

const toJSON = (issue: any) => {
  if (issue.reporter) {
    issue.reporter = usersMapper.toJSON(issue.reporter);
  }
  if (issue.assignees) {
    issue.assignees = issue.assignees.map(usersMapper.toJSON);
  }
  return issue;
};

export const issuesMapper = { toJSON };
