import Blog from './Blog';

const BlogList = ({ blogs, addLike, deleteBlog, user }) => {
  return (
    <div className='blog-list'>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog, index) => {
          let isMadeByUser = false;
          if (user && user.name === blog.user.name) {
            isMadeByUser = true;
          }
          return (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
              isMadeByUser={isMadeByUser}
              index={index}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default BlogList;