import { useQuery } from 'react-query';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';
import { useUserValue } from '../contexts/userContext';
import blogService from '../services/blogService';
import Blog from './Blog';
import BlogList from './BlogList';
import userService from '../services/userService';
import { useParams } from 'react-router-dom';

const User = () => {
  const notificationDispatch = useNotificationDispatch();
  const userResult = useQuery('users', userService.getUsers);
  const { id } = useParams();
  if(userResult.isLoading) {
    return <div>Loading...</div>
  } if (userResult.isError) {
    displayMessage(notificationDispatch, 'error loading user', true);
    console.error(userResult.error.message);
    return;
  }
  const users = userResult.data;
  const selectedUser = users.find((user) => user.id === id);
  return (
    <div>
      <BlogList user={selectedUser} />
    </div>
  )
}

export default User;