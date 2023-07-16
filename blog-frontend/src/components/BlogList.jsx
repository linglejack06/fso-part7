import Blog from './Blog';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogService';
import sorter from '../utils/sorter';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';
import { useUserValue } from '../contexts/userContext';

const BlogList = ({ onlyUserBlogs }) => {
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const queryClient = useQueryClient();
  const blogResult = useQuery({
    queryKey: 'blogs',
    queryFn: blogService.getBlogs,
    retry: false,
  });
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
  let blogs;
  if(onlyUserBlogs) {
    const userBlogs = blogResult.data.filter((blog) => blog.user.username === user.username);
    blogs = sorter(userBlogs);
  } else {
    blogs = sorter(blogResult.data);
  }
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