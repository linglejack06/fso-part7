import { useQuery } from 'react-query';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';
import { useUserValue } from '../contexts/userContext';
import blogService from '../services/blogService';
import Blog from './Blog';
import BlogList from './BlogList';

const User = () => {
  return (
    <div>
      <BlogList onlyUserBlogs={true} />
    </div>
  )
}

export default User;