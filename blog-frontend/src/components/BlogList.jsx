import Blog from './Blog';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogService';
import sorter from '../utils/sorter';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';

const BlogList = ({ user }) => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const blogResult = useQuery('blogs', () => blogService.getBlogs());
  const updateBlogLikesMutation = useMutation(blogService.updateLikes, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      const updatedBlogs = blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog);
      queryClient.setQueryData('blogs', updatedBlogs);
    }
  })
  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  })
  if(blogResult.isLoading) {
    return <div>Loading...</div>
  }
  if(blogResult.isError) {
    displayMessage(notificationDispatch, 'Error loading blogs', true);
    console.error(blogResult);
    return null;
  }
  const blogs = sorter(blogResult.data);
  const addLike = (blogId) => {
    const correctBlog = blogs.find((blog) => blog.id === blogId);
    updateBlogLikesMutation.mutate(correctBlog);
    displayMessage(notificationDispatch, 'Added like');
  }
  const deleteBlog = (blogId) => {
    const blogToDelete = blogs.find((blog) => blog.id === blogId);
    deleteBlogMutation.mutate(blogToDelete);
    displayMessage(notificationDispatch, 'deleted blog');
  }
  return (
    <div className='blog-list'>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog, index) => {
          let isMadeByUser = false;
          if (user && user.name === blog.user.name) {
            isMadeByUser = true;
          }
          return (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
              isMadeByUser={isMadeByUser}
              index={index}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default BlogList;