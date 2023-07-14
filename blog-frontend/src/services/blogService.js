import axios from 'axios';

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}
const BASEURL = '/api/blogs';
const getBlogs = async () => {
  const res = await axios.get(BASEURL);
  return res.data;
}
const addBlog = async (newBlog) => {
  const params = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(BASEURL, newBlog, params);
  return response.data;
}
const deleteBlog = async (blog) => {
  const params = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.delete(`${BASEURL}/${blog.id}`, params);
  return response.data;
}
const updateLikes = async (blog) => {
  const params = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${BASEURL}/${blog.id}`, { likes: blog.likes + 1 }, params);
  return response.data;
}

const blogService = { setToken, getBlogs, addBlog, deleteBlog, updateLikes };

export default blogService;