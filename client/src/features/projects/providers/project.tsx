import React, { createContext, useContext, useEffect, useState } from "react";
import { TProject } from "../types";
import axios from "@/utils/api";
import { CanceledError } from "axios";

const ProjectContext = createContext<TProject>(Object.create(null));

type ProjectProviderProps = {
  children: React.ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [project, setProject] = useState<TProject>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    axios
      .get("/projects/1", { signal })
      .then((result) => {
        setProject(result.data);
      })
      .catch((err) => {
        if (!(err instanceof CanceledError)) throw err;
      });
    return () => controller.abort();
  }, []);

  if (!project) return null;

  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
