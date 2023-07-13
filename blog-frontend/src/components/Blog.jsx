import { useState } from 'react';
import propTypes from 'prop-types';

const Blog = ({ blog, addLike, deleteBlog, isMadeByUser, index }) => {
  const [full, setFull] = useState(false);
  const toggleFull = () => {
    setFull(!full);
  }
  if (full) {
    return (
      <div className='wrapper'>
        <div className={`blog-container large ${index}-blog`}>
          <p>{blog.title} by {blog.author}</p>
          <a href={blog.url}>{blog.url}</a>
          <button className='like-btn' onClick={() => addLike(blog.id)}>
            Likes {blog.likes}
          </button>
          { isMadeByUser ? (
              <button onClick={() => deleteBlog(blog.id)}>
                Delete Blog
              </button>
            ) : ( null )
          }
        </div>
        <button onClick={toggleFull}>Close</button>
      </div>
    )
  }
  return (
    <div className={`blog-container small ${index}-blog`}>
      <p>{blog.title} by {blog.author}</p>
      <button className='expand-btn' onClick={toggleFull}>Expand</button>
    </div>
  )
}
// Blog.propTypes = {
//   blog: propTypes.object.isRequired,
//   addLike: propTypes.func.isRequired,
//   deleteBlog: propTypes.func.isRequired,
//   isMadeByUser: propTypes.bool.isRequired,
// }

export default Blog;