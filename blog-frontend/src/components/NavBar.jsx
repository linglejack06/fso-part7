import { Link } from "react-router-dom"
import { removeUser, useUserDispatch, useUserValue } from "../contexts/userContext"
import blogService from "../services/blogService";

const NavBar = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();
  const handleLogout = () => {
    blogService.setToken('');
    window.localStorage.removeItem('loggedUser');
    userDispatch(removeUser());
  }
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      <Link to='/create'>Create Blog</Link>
      {user === null ? (
        <div>
          <p>{user.name} Logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </div>
  )
};

export default NavBar;