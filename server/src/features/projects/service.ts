import db from "@/db";
import { TProjectCreate, TProjectUpdate, TProjectWhereUnique } from "./types";

const getProjects = async () => {
  const projects = await getProject({ id: 1 });
  return [projects];
};

const getProject = async (where: TProjectWhereUnique) => {
  const project = await db.project.findUnique({
    where,
    include: {
      lead: true,
    },
  });
  if (!project) return null;
  return project;
};

const createProject = async (props: TProjectCreate) => {
  const project = await db.project.create({
    data: { ...props, users: { create: { userId: props.leadId } } },
  });
  return project;
};

const updateProject = async (
  where: TProjectWhereUnique,
  props: TProjectUpdate
) => {
  const project = await db.project.update({ where, data: props });
  return project;
};

export const projectsService = {
  getProject,
  getProjects,
  createProject,
  updateProject,
};
