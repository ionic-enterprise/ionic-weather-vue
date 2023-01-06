import axios from 'axios';

const baseURL = 'https://api.openweathermap.org';

const client = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const useHttp = () => ({
  client,
});
