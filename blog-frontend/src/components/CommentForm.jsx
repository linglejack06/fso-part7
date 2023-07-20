import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogService";
import {
  displayMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";

const CommentForm = ({ blog }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const [comment, setComment] = useState("");
  const updateBlogCommentsMutation = useMutation(blogService.addComment, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.map((blog) =>
        blog.id === newBlog.id ? newBlog : blog,
      );
      queryClient.setQueryData("blogs", updatedBlogs);
    },
  });
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlogCommentsMutation.mutate({ blog, comment });
    displayMessage(notificationDispatch, `Added comment: ${comment}`);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start justify-between">
      <input
        type="text"
        value={comment}
        onChange={handleChange}
        id="comment"
        placeholder="Awesome Article!!"
        className="h-7 rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
      />
      <button
        type="submit"
        className="text-md h-7 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
      >
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
