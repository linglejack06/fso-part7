import axios from 'axios';

const BASEURL = '/api/login';

const login = async (credentials) => {
  const response = await axios.post(BASEURL, credentials);
  return response.data;
}
const loginService = { login };

export default loginService;