import { Metadata } from 'next';
import { Card } from '@heroui/react';
import axios from 'axios';
import WeatherCard from '@/components/WeatherCard';
import Link from 'next/link';
import { Button } from '@heroui/react';
import type { WeatherData } from '@/lib/api';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);

  return {
    title: `Weather in ${decodedCity}`,
    description: `Current weather conditions in ${decodedCity}`,
  };
}

async function getCityWeather(city: string): Promise<WeatherData | null> {
  try {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/current.json`,
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
        },
        timeout: 5000,
      }
    );
    return data;
  } catch {
    return null;
  }
}

export default async function CityWeatherPage({ params }: PageProps) {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const weatherData = await getCityWeather(decodedCity);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-black">
      <div className="container mx-auto px-4 py-12">
        <Link href="/search" className="inline-block mb-6">
          <Button variant="ghost">← Back to Search</Button>
        </Link>

        {weatherData ? (
          <div className="max-w-md mx-auto">
            <WeatherCard city={decodedCity} initialData={weatherData} showDetails />
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <Card.Content className="p-8 text-center">
              <h2 className="text-xl font-bold mb-2">City not found</h2>
              <p className="text-default-500 mb-4">
                Could not find weather data for &quot;{decodedCity}&quot;
              </p>
              <Link href="/search">
                <Button variant="primary">Try another city</Button>
              </Link>
          </Card.Content>
        </Card>
        )}
      </div>
    </div>
  );
}
