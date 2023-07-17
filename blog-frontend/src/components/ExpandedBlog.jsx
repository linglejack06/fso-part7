import { useQueryClient, useMutation, useQuery } from "react-query";
import blogService from "../services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { useUserValue } from "../contexts/userContext";
import { displayMessage, useNotificationDispatch } from "../contexts/notificationContext";
import Togglable from './Togglable';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const BlogDetails = ({ selectedBlog, user, deleteBlog, addLike }) => {
  return (
    <div>
    <div>
      <h2>{selectedBlog.title}</h2>
        {
          (user.username === selectedBlog.user.username)
            ? <button onClick={deleteBlog}>Delete</button>
            : (null)
        }
    </div>
    <a href={selectedBlog.url}>{selectedBlog.url}</a>
    <div>
      <p>{selectedBlog.likes} Likes</p>
      <button onClick={addLike}>Like</button>
    </div>
    <p>Created By: {selectedBlog.user.name}</p>
  </div>
  )
}
const ExpandedBlog = () => {
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
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
  const blogResult = useQuery('blogs', blogService.getBlogs);
  if (blogResult.isLoading) {
    return <div>Loading...</div>
  }
  if(blogResult.isError) {
    displayMessage(notificationDispatch, 'Error Loading blog', true);
    console.error(blogResult.error.message);
    return;
  }
  const blogs = blogResult.data;
  const selectedBlog = blogs.find((blog) => blog.id === id);
  const deleteBlog = () => {
    deleteBlogMutation.mutate(selectedBlog);
    navigate('/');
    displayMessage(notificationDispatch, `Deleted ${selectedBlog.title}`);
  }
  const addLike = () => {
    updateBlogLikesMutation.mutate(selectedBlog);
    displayMessage(notificationDispatch, `Added like to ${selectedBlog.title}`);
  }
  return (
    <div>
      <BlogDetails selectedBlog={selectedBlog} user={user} deleteBlog={deleteBlog} addLike={addLike} />
      <Togglable buttonLabel='Add Comment'>
        <CommentForm />
      </Togglable>
      <CommentList comments={selectedBlog.comments} />
    </div>
  )
}

export default ExpandedBlog;