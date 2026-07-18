'use client';

import { useQuery } from '@tanstack/react-query';
import { getWeather, type WeatherData } from '@/lib/api';
import { Card, Spinner, Skeleton } from '@heroui/react';

interface WeatherCardProps {
  city: string;
  initialData?: WeatherData;
  showDetails?: boolean;
}

export default function WeatherCard({ city, initialData, showDetails = false }: WeatherCardProps) {
  const { data, isLoading, error } = useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: () => getWeather(city),
    initialData,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <Card.Content className="p-6">
          <Skeleton className="h-8 w-3/4 mb-4 rounded-lg" />
          <Skeleton className="h-12 w-1/2 mb-4 rounded-lg" />
          <Skeleton className="h-6 w-full rounded-lg" />
        </Card.Content>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <Card.Content className="p-6">
          <p className="text-danger">Error: {error.message}</p>
        </Card.Content>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="w-full">
      <Card.Content className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {data.location.name}
            </h2>
            <p className="text-default-500">
              {data.location.region}, {data.location.country}
            </p>
          </div>
          <img
            src={`https:${data.current.condition.icon}`}
            alt={data.current.condition.text}
            width={64}
            height={64}
          />
        </div>

        <div className="mt-4">
          <p className="text-4xl font-bold">{data.current.temp_c}°C</p>
          <p className="text-default-500">{data.current.condition.text}</p>
        </div>

        {showDetails && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-default-500">Feels like</p>
              <p className="font-semibold">{data.current.feelslike_c}°C</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Humidity</p>
              <p className="font-semibold">{data.current.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-default-500">Wind</p>
              <p className="font-semibold">{data.current.wind_kph} kph</p>
            </div>
            <div>
              <p className="text-sm text-default-500">UV Index</p>
              <p className="font-semibold">{data.current.uv}</p>
            </div>
          </div>
        )}

        {showDetails && (
          <div className="mt-4">
            <p className="text-sm text-default-500">
              Local time: {data.location.localtime}
            </p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
