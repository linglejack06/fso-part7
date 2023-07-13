const sorter = (blogs) => {
  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);
  return sortedBlogs;
}

export default sorter;