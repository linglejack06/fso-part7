import axios from "axios";

const BASEURL = "/api/users";
const getUsers = async () => {
  const response = await axios.get(BASEURL);
  return response.data;
};
const addUser = async (credentials) => {
  const response = await axios.post(BASEURL, credentials);
  return response.data;
};
const userService = { getUsers, addUser };

export default userService;
