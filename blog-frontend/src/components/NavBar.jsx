import { Link, useLocation } from "react-router-dom";
import {
  removeUser,
  useUserDispatch,
  useUserValue,
} from "../contexts/userContext";
import blogService from "../services/blogService";
import { useState } from "react";
import MobileNav from "./MobileNav";
import WebNav from "./WebNav";

const NavBar = () => {
  const user = useUserValue();
  const [full, setFull] = useState(false);
  const path = useLocation();
  const userDispatch = useUserDispatch();
  const handleLogout = () => {
    blogService.setToken("");
    window.localStorage.removeItem("loggedUser");
    userDispatch(removeUser());
    className = "";
  };
  const toggleFull = () => {
    setFull(!full);
  };
  return (
    <div className="relative mb-12 h-full text-white md:mb-2">
      <div
        className={`text-md fixed left-0 right-0 top-0 mb-4 h-10 rounded-b-md border-4 border-purple-700 bg-purple-700 bg-opacity-90 font-semibold shadow-md md:hidden ${
          full ? "hidden" : ""
        }`}
      >
        <Link
          to="/"
          className={`absolute left-2 top-1 text-lg text-orange-600`}
        >
          Blog-it!
        </Link>
        <button
          type="button"
          onClick={toggleFull}
          className="absolute right-2 top-2"
        >
          <svg viewBox="0 0 100 80" width="20" height="20">
            <rect width="100" rx="8" height="15"></rect>
            <rect y="30" rx="8" width="100" height="15"></rect>
            <rect y="60" rx="8" width="100" height="15"></rect>
          </svg>
        </button>
      </div>
      <MobileNav
        full={full}
        toggleFull={toggleFull}
        path={path}
        user={user}
        handleLogout={handleLogout}
      />
      <WebNav path={path} user={user} handleLogout={handleLogout} />
    </div>
  );
};

export default NavBar;
