import axios from 'axios'

const get = (url) => {
  return axios.get(url);
}

export default { get }