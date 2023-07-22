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
        blog.id === updatedBlog.id ? updatedBlog : blog,
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
      (blog) => blog.user.username === user.username,
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
    <div className="h-full w-full flex-col px-8">
      <h2 className="mb-4 flex-none text-xl font-bold">{title}</h2>
      <ul className="flex-auto flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {blogs.map((blog, index) => {
          return (
            <Blog key={blog.id} blog={blog} addLike={addLike} index={index} />
          );
        })}
      </ul>
    </div>
  );
};

export default BlogList;
