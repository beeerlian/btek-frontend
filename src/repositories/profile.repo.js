import client from '../helpers/client.api';

const updateProfile = (body) => {
  const token = window.localStorage.getItem('token');
  return client(token).put('/profile', body, { headers: { 'Content-Type': 'multipart/form-data' } });
};
const getProfile = () => {
  const token = window.localStorage.getItem('token');
  return client(token).get('/profile');
};

export default { getProfile, updateProfile };
