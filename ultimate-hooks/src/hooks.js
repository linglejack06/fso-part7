import axios from 'axios';
import { useState, useEffect } from 'react';

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources(resources.concat(response.data));
  }
  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data));
  }, [baseUrl])
  return [
    resources, {
      create,
    }
  ];
}