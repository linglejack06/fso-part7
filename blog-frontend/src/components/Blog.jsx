import { Link } from "react-router-dom";
import { ReactComponent as EmptyHeart } from "../emptyHeart.svg";

const Blog = ({ blog, addLike, index }) => {
  return (
    <div className="mb-4 flex flex-auto justify-between rounded-lg bg-orange-100 p-4 shadow-xl ring-2 ring-orange-200 md:mb-0">
      <div className="group flex-auto flex-col hover:cursor-pointer">
        <Link
          to={`/blogs/${blog.id}`}
          className="text-md overflow-hidden font-semibold text-gray-900 transition duration-200 ease-in-out group-hover:font-bold group-hover:text-purple-700 group-hover:underline"
        >
          {blog.title}
        </Link>
        <p className="text-sm text-gray-800">By {blog.author}</p>
        <p className="text-sm text-gray-700">{blog.likes} Likes</p>
      </div>
      <button
        className="flex h-full flex-auto items-center justify-end"
        onClick={() => addLike(blog.id)}
      >
        <EmptyHeart className="h-10 transition duration-300 hover:scale-110" />
      </button>
    </div>
  );
};

export default Blog;
