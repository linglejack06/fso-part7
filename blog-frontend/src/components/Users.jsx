import { useQuery } from 'react-query';
import userService from '../services/userService';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';
import { Link } from 'react-router-dom';

const Users = () => {
  const notificationDispatch = useNotificationDispatch();
  const userResult = useQuery('users', userService.getUsers);
  if(userResult.isLoading) {
    return <div>Loading...</div>
  } if(userResult.isError) {
    displayMessage(notificationDispatch, 'Error loading users', true);
    console.error(userResult.error.message);
    return;
  }
  const users = userResult.data;
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Names</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users;