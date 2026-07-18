import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
  };
}

export interface SearchResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export async function getWeather(city: string): Promise<WeatherData> {
  const { data } = await api.get<WeatherData>('/weather', {
    params: { q: city, days: 1 },
  });
  return data;
}

export async function searchCities(query: string): Promise<SearchResponse[]> {
  if (!query || query.length < 2) return [];
  const { data } = await api.get<SearchResponse[]>('/search', {
    params: { q: query },
  });
  return data;
}

export async function getForecast(city: string, days: number = 3) {
  const { data } = await api.get('/weather', {
    params: { q: city, days },
  });
  return data;
}
