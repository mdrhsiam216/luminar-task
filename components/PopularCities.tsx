import { Card } from '@heroui/react';
import Link from 'next/link';
import { type WeatherData } from '@/lib/api';

interface PopularCitiesProps {
  cities: WeatherData[];
}

export default function PopularCities({ cities }: PopularCitiesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {cities.map((weather) => (
        <Link
          key={weather.location.name}
          href={`/weather/${encodeURIComponent(weather.location.name)}`}
        >
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <Card.Content className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{weather.location.name}</h3>
                  <p className="text-sm text-default-500">{weather.location.country}</p>
                </div>
                <img
                  src={`https:${weather.current.condition.icon}`}
                  alt={weather.current.condition.text}
                  width={48}
                  height={48}
                />
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold">{weather.current.temp_c}°C</p>
                <p className="text-sm text-default-500">{weather.current.condition.text}</p>
              </div>
            </Card.Content>
          </Card>
        </Link>
      ))}
    </div>
  );
}
