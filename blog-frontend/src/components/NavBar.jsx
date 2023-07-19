import { Link, useLocation } from "react-router-dom";
import {
  removeUser,
  useUserDispatch,
  useUserValue,
} from "../contexts/userContext";
import blogService from "../services/blogService";
import { useState } from "react";

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
  if (full) {
    return (
      <div className="flex-column h-full items-center">
        <Link
          className={`${
            path.pathname === "/" ? "text-orange-600" : ""
          } text-md ml-3 flex h-full items-center py-1 text-center font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
          to="/"
        >
          Blog-it!
        </Link>
        <div className="flex-column h-full flex-auto">
          <Link
            className={`${
              path.pathname === "/users" ? "text-orange-600" : ""
            } text-md ml-3 flex h-full items-center py-1 font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
            to="/users"
          >
            Users
          </Link>
          {user ? (
            <Link
              className={`${
                path.pathname === "/create" ? "text-orange-600" : ""
              } text-md ml-3 flex h-full items-center py-1 font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
              to="/create"
            >
              Create Blog
            </Link>
          ) : null}
        </div>
        <div className="flex-column mr-2 h-full flex-auto">
          {user ? (
            <div className="flex-column flex-auto justify-start">
              <h3 className="text-md ml-3 mr-4 h-full py-1 text-left font-semibold">
                Logged in: {user.username}
              </h3>
              <div className="flex h-full items-center">
                <button
                  className="text-md ml-3 h-7 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-auto justify-end">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-4 h-12">
      <div>
        <Link to="/">Blog-it!</Link>
        <button type="button" onClick={toggleFull}></button>
      </div>
      <div className="flex h-full ring-4 ring-orange-400">
        <div className="flex h-full flex-auto">
          <Link
            className={`${
              path.pathname === "/" ? "text-orange-600" : ""
            } text-md flex h-full items-center border-r-2 px-4 text-center font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`${
              path.pathname === "/users" ? "text-orange-600" : ""
            } text-md flex h-full items-center border-r-2 px-4 font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
            to="/users"
          >
            Users
          </Link>
          {user ? (
            <Link
              className={`${
                path.pathname === "/create" ? "text-orange-600" : ""
              } text-md flex h-full items-center border-r-2 px-4 font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
              to="/create"
            >
              Create Blog
            </Link>
          ) : null}
        </div>
        <div className="mr-2 flex h-full flex-auto">
          {user ? (
            <div className="flex flex-auto items-center justify-end self-center">
              <h3 className="text-md h-full px-4 text-center font-semibold">
                Logged in: {user.username}
              </h3>
              <div className="flex h-full items-center">
                <button
                  className="text-md h-7 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-auto justify-end">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
