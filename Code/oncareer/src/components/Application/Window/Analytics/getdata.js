import axios from 'axios';

export function axiosGet(url) {
  return axios.get(url).then(response => response.json());
}