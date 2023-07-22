import { useQueryClient, useMutation, useQuery } from "react-query";
import blogService from "../services/blogService";
import { useNavigate, useParams } from "react-router-dom";
import { useUserValue } from "../contexts/userContext";
import {
  displayMessage,
  useNotificationDispatch,
} from "../contexts/notificationContext";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { ReactComponent as EmptyHeart } from "../emptyHeart.svg";

const BlogDetails = ({ selectedBlog, user, deleteBlog, addLike }) => {
  let userValue = user;
  if (!userValue) {
    userValue = {
      username: "",
      name: "",
    };
  }
  return (
    <div className="h-full w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{selectedBlog.title}</h2>
          <a
            href={selectedBlog.url}
            className="font-semibold text-orange-600 hover:text-purple-700 hover:underline"
          >
            Link To Blog
          </a>
        </div>
        {userValue.username === selectedBlog.user.username ? (
          <button
            onClick={deleteBlog}
            className="rounded-md bg-orange-100 p-2 font-bold text-red-600 ring-2 ring-orange-200 transition-colors duration-300 hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        ) : null}
      </div>
      <div className="mb-4 flex items-center">
        <button onClick={addLike} className="mr-4">
          <EmptyHeart className="h-10 transition duration-300 hover:scale-110" />
        </button>
        <p className="text-lg font-semibold text-gray-700">
          {selectedBlog.likes} Likes
        </p>
      </div>
      <div className="flex-col">
        <p className="font-semibold">Written By: {selectedBlog.author}</p>
        <p className="font-semibold text-orange-600 hover:font-bold hover:text-purple-700 hover:underline">
          Posted By:{" "}
          <Link to={`/users/${selectedBlog.user.id}`}>
            {selectedBlog.user.name}
          </Link>
        </p>
      </div>
    </div>
  );
};
const ExpandedBlog = () => {
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const updateBlogLikesMutation = useMutation(blogService.updateLikes, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
      queryClient.setQueryData("blogs", updatedBlogs);
    },
  });
  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });
  const blogResult = useQuery("blogs", blogService.getBlogs);
  if (blogResult.isLoading) {
    return <div>Loading...</div>;
  }
  if (blogResult.isError) {
    displayMessage(notificationDispatch, "Error Loading blog", true);
    console.error(blogResult.error.message);
    return;
  }
  if (!user) {
  }
  const blogs = blogResult.data;
  const selectedBlog = blogs.find((blog) => blog.id === id);
  const deleteBlog = () => {
    deleteBlogMutation.mutate(selectedBlog);
    navigate("/");
    displayMessage(notificationDispatch, `Deleted ${selectedBlog.title}`);
  };
  const addLike = () => {
    updateBlogLikesMutation.mutate(selectedBlog);
    displayMessage(notificationDispatch, `Added like to ${selectedBlog.title}`);
  };
  return (
    <div className="h-full w-full p-4">
      <BlogDetails
        selectedBlog={selectedBlog}
        user={user}
        deleteBlog={deleteBlog}
        addLike={addLike}
      />
      <div>
        <h2 className="mb-1 mt-4 text-lg font-semibold">Comments</h2>
        <CommentForm blog={selectedBlog} />
      </div>
      <CommentList comments={selectedBlog.comments} />
    </div>
  );
};

export default ExpandedBlog;
