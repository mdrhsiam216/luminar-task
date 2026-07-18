import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 10000,
  params: {
    key: process.env.WEATHER_API_KEY,
  },
});

weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || 'Failed to fetch weather data';
    return Promise.reject(new Error(message));
  }
);

export default weatherApi;
