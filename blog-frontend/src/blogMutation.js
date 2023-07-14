import { useMutation, useQueryClient } from 'react-query';
import blogService from './services/blogService';


const queryClient = useQueryClient();
export const newBlogMutation = useMutation(blogService.addBlog, {
  onSuccess: (newBlog) => {
    const blogs = QueryClient.getQueryData('blogs');
    queryClient.setQueryData('blogs', blogs.concat(newBlog))
  }
});
export const updateBlogLikesMutation = useMutation(blogService.updateLikes, {
  onSuccess: (updatedBlog) => {
    const blogs = queryClient.getQueryData('blogs');
    const updatedBlogs = blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog);
    queryClient.setQueryData('blogs', updatedBlogs);
  }
})
export const deleteBlogMutation = useMutation(blogService.deleteBlog, {
  onSuccess: () => {
    queryClient.invalidateQueries('blogs');
  }
})

