import Blog from "./Blog";
import { useQuery, useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogService";
import sorter from "../utils/sorter";
import {
  displayMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";

const BlogList = ({ user }) => {
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const blogResult = useQuery({
    queryKey: "blogs",
    queryFn: blogService.getBlogs,
    retry: false,
  });
  const updateBlogLikesMutation = useMutation(blogService.updateLikes, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      queryClient.setQueryData("blogs", updatedBlogs);
    },
  });
  if (blogResult.isLoading) {
    return <div>Loading...</div>;
  }
  if (blogResult.isError) {
    displayMessage(notificationDispatch, "Error loading blogs", true);
    console.error(blogResult);
    return null;
  }
  let blogs;
  let title;
  if (user) {
    const userBlogs = blogResult.data.filter(
      (blog) => blog.user.username === user.username
    );
    blogs = sorter(userBlogs);
    title = `${user.name}'s Blogs`;
  } else {
    blogs = sorter(blogResult.data);
    title = "All Blogs";
  }
  const addLike = (blogId) => {
    const correctBlog = blogs.find((blog) => blog.id === blogId);
    updateBlogLikesMutation.mutate(correctBlog);
    displayMessage(notificationDispatch, "Added like");
  };
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      <ul>
        {blogs.map((blog, index) => {
          let isMadeByUser = false;
          if (user && user.name === blog.user.name) {
            isMadeByUser = true;
          }
          return (
            <Blog key={blog.id} blog={blog} addLike={addLike} index={index} />
          );
        })}
      </ul>
    </div>
  );
};

export default BlogList;
