'use client';

import CitySearch from '@/components/CitySearch';
import WeatherCard from '@/components/WeatherCard';
import { Card } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { getWeather, type WeatherData } from '@/lib/api';

export default function SearchPage() {
  const { data: defaultWeather } = useQuery<WeatherData>({
    queryKey: ['weather', 'London'],
    queryFn: () => getWeather('London'),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Search Weather</h1>

        <div className="flex flex-col items-center gap-8">
          <CitySearch />

          <Card className="w-full max-w-md">
            <Card.Content className="p-6">
              <h2 className="text-lg font-semibold mb-4">Current Weather in London</h2>
              <WeatherCard city="London" initialData={defaultWeather} showDetails />
          </Card.Content>
        </Card>
        </div>
      </div>
    </div>
  );
}
