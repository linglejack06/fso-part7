import { useQuery } from "react-query";
import userService from "../services/userService";
import {
  displayMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { Link } from "react-router-dom";

const Users = () => {
  const notificationDispatch = useNotificationDispatch();
  const userResult = useQuery("users", userService.getUsers);
  if (userResult.isLoading) {
    return <div>Loading...</div>;
  }
  if (userResult.isError) {
    displayMessage(notificationDispatch, "Error loading users", true);
    console.error(userResult.error.message);
    return;
  }
  const users = userResult.data;
  return (
    <div className="h-full w-full p-4">
      <h2 className="mb-2 text-center text-2xl font-bold">Users</h2>
      <div className="mx-auto h-full w-full overflow-hidden rounded-md shadow-lg ring-4 ring-purple-700">
        <table className="h-full w-full text-center text-lg font-semibold">
          <thead>
            <tr className="bg-purple-600 font-semibold text-white">
              <th>Name</th>
              <th>Username</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="group odd:bg-orange-200 even:bg-orange-100 odd:hover:bg-orange-400 even:hover:bg-orange-300"
              >
                <td className="text-md font-semibold group-hover:font-bold group-hover:text-purple-700 group-hover:underline">
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td className="text-md font-semibold group-hover:font-bold group-hover:text-purple-700 group-hover:underline">
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
