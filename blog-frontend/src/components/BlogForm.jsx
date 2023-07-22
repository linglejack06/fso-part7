import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUserValue } from "../contexts/userContext";
import {
  displayMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import blogService from "../services/blogService";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const user = useUserValue();
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.addBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      console.log(blogs);
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
    },
  });
  const navigate = useNavigate();
  if (!user) {
    displayMessage(notificationDispatch, "Login to add blog", true);
    return <div>No Logged In user found</div>;
  }
  const handleChange = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "author":
        setAuthor(e.target.value);
        break;
      case "url":
        setUrl(e.target.value);
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length <= 3 || author.length <= 3) {
      displayMessage(
        notificationDispatch,
        "Title and author must be at least 4 characters",
        true,
      );
      return;
    }
    const url = e.target;
    if (!url.checkValidity()) {
      displayMessage(
        notificationDispatch,
        "Url must be written as: https://...",
        true,
      );
      return;
    }
    newBlogMutation.mutate({ title, author, url });
    displayMessage(notificationDispatch, `Added blog: ${title}`);
    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };
  return (
    <div className="mx-auto w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-4 rounded-lg bg-orange-100 p-4 px-8 pb-8 pt-6 shadow-lg ring-2 ring-orange-200"
      >
        <h2 className="mb-2 text-center text-xl font-bold">Post a Blog</h2>
        <div className="mb-2">
          <label
            htmlFor="title"
            className="text-md mb-2 block font-semibold text-orange-600"
          >
            Title{" "}
          </label>
          <input
            value={title}
            onChange={handleChange}
            name="title"
            id="title"
            required
            placeholder="How to code a blog app"
            className="h-7 w-full rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="author"
            className="text-md mb-2 block font-semibold text-orange-600"
          >
            Author{" "}
          </label>
          <input
            value={author}
            placeholder={user.name}
            onChange={handleChange}
            name="author"
            id="author"
            required
            className="h-7 w-full rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="url"
            className="text-md mb-2 block font-semibold text-orange-600"
          >
            Web Address{" "}
          </label>
          <input
            type="url"
            pattern="https://.*"
            placeholder="https://example.org"
            value={url}
            onChange={handleChange}
            name="url"
            id="url"
            required
            className="h-7  w-full rounded-lg border-2 border-purple-950 bg-orange-100 px-4 font-semibold outline-none hover:border-purple-700 focus:border-orange-600"
          />
        </div>
        <div className="flex justify-center">
          <button
            className="text-md h-7 w-1/2 rounded-lg bg-purple-600 px-4 text-center font-semibold text-white transition duration-200 hover:scale-105 hover:bg-purple-700 hover:font-bold"
            type="submit"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
