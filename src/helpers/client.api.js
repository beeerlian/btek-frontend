import axios from 'axios';

const client = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: 'http://127.0.0.1:8081',
    headers,
  });
};

export default client;
