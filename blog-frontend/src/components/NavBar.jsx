import { Link } from "react-router-dom";
import {
  removeUser,
  useUserDispatch,
  useUserValue,
} from "../contexts/userContext";
import blogService from "../services/blogService";

const NavBar = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const handleLogout = () => {
    blogService.setToken("");
    window.localStorage.removeItem("loggedUser");
    userDispatch(removeUser());
  };
  console.log(user);
  return (
    <div className="flex justify-between p-4">
      <div className="flex flex-auto gap-8">
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/create">Create Blog</Link>
      </div>
      <div className="flex-auto">
        {user ? (
          <div className="flex flex-auto justify-end gap-8">
            <p>Logged in: {user.username}</p>
            <button onClick={handleLogout}>Logout</button>
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

export default NavBar;
