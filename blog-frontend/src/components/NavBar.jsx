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
  console.log(user);
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/users'>Users</Link>
      {/* add spacer to push above to left and below to right */}
      <Link to='/create'>Create Blog</Link>
      {user ? (
        <div>
          <p>Logged in: {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </div>
  )
};

export default NavBar;