import { Link } from "react-router-dom";
import closeIcon from "../closeIcon.svg";

const MobileNav = ({ full, toggleFull, path, user, handleLogout }) => {
  return (
    <div
      className={`${
        full ? "flex-col" : "hidden"
      } relative h-full items-center rounded-b-md border-4 border-purple-200 bg-purple-200 bg-opacity-90 shadow-lg md:hidden`}
    >
      <button onClick={toggleFull} className={`absolute right-2 top-2`}>
        <img src={closeIcon} alt="Close Menu" className="h-4"></img>
      </button>
      <Link
        className={`${
          path.pathname === "/" ? "text-orange-600" : ""
        } text-md ml-3 flex h-full items-center py-1 pt-2 text-center font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
        to="/"
      >
        Blog-it!
      </Link>
      <div className="flex-column h-full flex-auto">
        <Link
          className={`${
            path.pathname === "/users" ? "text-orange-600" : ""
          } text-md ${
            user ? "" : "mb-4"
          } ml-3 flex h-full items-center py-1 font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
          to="/users"
        >
          Users
        </Link>
        {user ? (
          <Link
            className={`${
              path.pathname === "/create" ? "text-orange-600" : ""
            } text-md mb-4 ml-3 flex h-full items-center py-1 font-semibold transition duration-200 hover:font-bold hover:text-purple-700 hover:underline hover:underline-offset-4`}
            to="/create"
          >
            Create Blog
          </Link>
        ) : null}
      </div>
      <div className="flex h-full flex-auto">
        {user ? (
          <div className="flex flex-auto justify-between">
            <h3 className="text-md ml-3 h-full py-1 text-left font-semibold">
              Logged in: {user.username}
            </h3>
            <div className="ml-auto flex h-full flex-auto items-center justify-end">
              <button
                className="text-md mr-3 h-7 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-md ml-3 flex flex-auto justify-start gap-3 font-semibold">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
