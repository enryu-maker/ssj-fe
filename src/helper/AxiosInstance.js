import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.saishraddhajewellers.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
