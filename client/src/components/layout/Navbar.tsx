import clsx from "clsx";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useClickOutside } from "../../../common/hooks";
import { Container } from "./Container";
import { useAuth } from "../../../auth";
import { storage } from "../../helpers";
import Button from "../elements/Button";

const activeLink = ({ isActive }: { isActive: boolean }) =>
  isActive ? { color: "white" } : {};

export const Navbar = () => {
  const { user, setUser } = useAuth();
  const logout = () => {
    setUser(undefined);
    storage.removeToken();
  };
  return (
    <header className="bg-slate-700 text-white py-4">
      <Container>
        <nav>
          <ul className="flex items-center gap-8">
            <NavLink
              to="/"
              style={activeLink}
              className="mr-auto font-semibold text-2xl"
            >
              SAMPLE APP
            </NavLink>
            <NavLink
              to="/"
              style={activeLink}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Home
            </NavLink>
            {user ? (
              <PrivateLinks userId={user.id} logout={logout} />
            ) : (
              <PublicLinks />
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

const PublicLinks = () => {
  return (
    <>
      <NavLink
        to="/auth/signup"
        style={activeLink}
        className="text-slate-400 hover:text-white transition-colors"
      >
        Sign up
      </NavLink>
      <NavLink
        to="/auth/login"
        style={activeLink}
        className="text-slate-400 hover:text-white transition-colors"
      >
        Log in
      </NavLink>
    </>
  );
};

const PrivateLinks = ({
  userId,
  logout,
}: {
  userId: string;
  logout: () => void;
}) => {
  return (
    <>
      <NavLink
        to="/users"
        className="text-slate-400 hover:text-white transition-colors"
        style={activeLink}
        end
      >
        Users
      </NavLink>
      <AccountMenu userId={userId} logout={logout} />
    </>
  );
};

const AccountMenu = ({
  userId,
  logout,
}: {
  userId: string;
  logout: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setExpanded(false));

  const toggleMenu = () => setExpanded(!expanded);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggleMenu}
        aria-expanded={expanded}
        aria-controls="account-menu"
        className="flex items-center text-slate-400 hover:text-white transition-colors"
      >
        Account <span className="text-[0.65rem] ml-2">▼</span>
      </button>
      <div
        id="account-menu"
        className={clsx(
          "scale-0 absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white text-black text-sm min-w-[150px] rounded-sm shadow-md transition-transform",
          expanded ? "scale-100" : "scale-0"
        )}
      >
        <ul className="flex flex-col">
          <NavLink
            onClick={toggleMenu}
            to={`/users/${userId}`}
            className="hover:bg-black/10 transition-colors px-3 py-1"
          >
            Profile
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to={`/users/${userId}/settings`}
            className="hover:bg-black/10 transition-colors px-3 py-1"
          >
            Settings
          </NavLink>
          <hr className="my-2" />
          <Button
            onClick={logout}
            className="hover:bg-black/10 transition-colors px-3 py-1"
          >
            Log out
          </Button>
        </ul>
      </div>
    </div>
  );
};
