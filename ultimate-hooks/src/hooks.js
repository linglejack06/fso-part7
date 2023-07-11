import axios from 'axios';

export const useResource = async (baseUrl) => {
  let token;
  const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  }
  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  }
  const create = async (newObject) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  }
  const resources = await getAll();
  return [
    resources, {
      setToken, create,
    }
  ];
}