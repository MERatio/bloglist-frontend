import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const get = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`);
  return response.data;
};

const update = async (id, newProps) => {
  const response = await axios.put(`${baseUrl}/${id}`, newProps);
  return response.data;
};

const deleteObject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const blogService = { setToken, getAll, create, get, update, deleteObject };

export default blogService;
