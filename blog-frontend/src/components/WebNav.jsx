import { Link } from "react-router-dom";

const WebNav = ({ path, user, handleLogout }) => {
  return (
    <div className="hidden h-12 rounded-b-md border-4 border-purple-700 bg-purple-700 bg-opacity-90 shadow-lg md:flex">
      <div className="flex h-full flex-auto">
        <Link
          className={`${
            path.pathname === "/" ? "text-orange-600" : ""
          } text-md flex h-full items-center px-4 text-center font-semibold transition duration-200 hover:font-bold hover:text-purple-950 hover:underline hover:underline-offset-4`}
          to="/"
        >
          Blog-it!
        </Link>
        <Link
          className={`${
            path.pathname === "/users" ? "text-orange-600" : ""
          } text-md flex h-full items-center px-4 font-semibold transition duration-200 hover:font-bold hover:text-purple-950 hover:underline hover:underline-offset-4`}
          to="/users"
        >
          Users
        </Link>
        {user ? (
          <Link
            className={`${
              path.pathname === "/create" ? "text-orange-600" : ""
            } text-md flex h-full items-center px-4 font-semibold transition duration-200 hover:font-bold hover:text-purple-950 hover:underline hover:underline-offset-4`}
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
                className="text-md h-7 rounded-lg bg-orange-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-950 hover:font-bold"
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
};

export default WebNav;
