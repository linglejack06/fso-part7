import axios from 'axios';

const BASEURL = '/api/users';
const getUsers = async () => {
  const response = await axios.get(BASEURL);
  return response.data;
}

const userService = { getUsers }

export default userService;