import { Metadata } from 'next';
import { Card, Button } from '@heroui/react';
import Link from 'next/link';
import axios from 'axios';
import PopularCities from '@/components/PopularCities';
import type { WeatherData } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Weather App - Home',
  description: 'Check weather conditions for cities around the world',
};

async function getPopularCities(): Promise<WeatherData[]> {
  const cities = ['London', 'New York', 'Tokyo', 'Paris'];

  try {
    const results = await Promise.all(
      cities.map(async (city) => {
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
      })
    );

    return results.filter((r): r is WeatherData => r !== null);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const popularCities = await getPopularCities();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Weather App</h1>
          <p className="text-lg text-default-500 mb-8">
            Check current weather conditions for cities around the world
          </p>

          <Link href="/search">
            <Button size="lg" variant="primary">
              Search for a City
            </Button>
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Popular Cities</h2>
          {popularCities.length > 0 ? (
            <PopularCities cities={popularCities} />
          ) : (
            <Card>
              <Card.Content>
                <p className="text-center text-default-500">
                  Unable to load weather data. Please try again later.
                </p>
              </Card.Content>
            </Card>
          )}
        </section>

        <section className="mt-12">
          <Card>
            <Card.Content className="p-8">
              <h2 className="text-xl font-bold mb-4">How it works</h2>
              <ul className="space-y-2 text-default-500">
                <li>1. Search for any city using the search bar</li>
                <li>2. Click on a city to see detailed weather information</li>
                <li>3. View temperature, humidity, wind speed, and more</li>
              </ul>
            </Card.Content>
          </Card>
        </section>
      </div>
    </div>
  );
}
