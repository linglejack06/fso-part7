import { Link } from "react-router-dom";

const Blog = ({ blog, addLike, index }) => {
  return (
    <div className={`blog-container small ${index}-blog`}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
      <button onClick={() => addLike(blog.id)}>{blog.likes} Likes</button>
    </div>
  );
};

export default Blog;
