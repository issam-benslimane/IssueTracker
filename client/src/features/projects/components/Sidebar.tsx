import { ProjectIcon } from "./ProjectIcon";
import { BsKanban } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

export const Sidebar = () => {
  return (
    <div className="h-screen bg-slate-100 px-5 py-6">
      <div className="mb-8 flex items-center gap-x-2">
        <ProjectIcon />
        <div className="">
          <p className="text-sm font-medium text-slate-800">singularity 1.0</p>
          <p className="text-xs text-slate-600">Software project</p>
        </div>
      </div>
      <nav>
        <NavItem to="/projects/board">
          <BsKanban size={20} />
          <p>Kanban Board</p>
        </NavItem>
        <NavItem to="/projects/settings">
          <FiSettings size={20} />
          <p>Project Settings</p>
        </NavItem>
      </nav>
    </div>
  );
};

const NavItem = ({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex items-center gap-x-3 rounded-md px-4 py-3 text-sm transition-colors hover:bg-slate-200",
          isActive ? "bg-slate-200 text-blue-700" : "text-slate-900"
        )
      }
    >
      {children}
    </NavLink>
  );
};
