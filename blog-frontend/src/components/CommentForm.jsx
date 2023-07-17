import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogService';
import { displayMessage, useNotificationDispatch } from '../contexts/notificationContext';

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const [comment, setComment] = useState('');
  const updateBlogCommentsMutation = useMutation(blogService.addComment, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      const updatedBlogs= blogs.map((blog) => blog.id === newBlog.id ? newBlog : blog);
      queryClient.setQueryData('blogs', updatedBlogs)
    }
  });
  const handleChange = (e) => {
    setComment(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlogCommentsMutation.mutate({blog, comment});
    displayMessage(notificationDispatch, `Added comment: ${comment}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={comment} onChange={handleChange} id='comment' placeholder='Awesome Article!!'/>
      <button type='submit'>Add Comment</button>
    </form>
  )
}

export default CommentForm;