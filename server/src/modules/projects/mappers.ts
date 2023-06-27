import { issuesMapper } from "../issues";
import { usersMapper } from "../users";

const toJSON = (project: any) => {
  if (project.lead) {
    project.lead = usersMapper.toJSON(project.lead);
  }
  if (project.users) {
    project.users = project.users.map(usersMapper.toJSON);
  }
  if (project.issues) {
    project.issues = project.issues.map(issuesMapper.toJSON);
  }
  return project;
};

export const projectsMapper = { toJSON };
