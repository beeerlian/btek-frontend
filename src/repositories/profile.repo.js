import client from '../helpers/client.api';

const updateProfile = (body) => {
  const token = window.localStorage.getItem('token');
  return client(token).put('/profile', body);
};
const getProfile = () => {
  const token = window.localStorage.getItem('token');
  return client(token).get('/profile');
};

export default { getProfile, updateProfile };
