'use client';

import { useState, useCallback, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities, type SearchResponse } from '@/lib/api';
import { Card, Spinner } from '@heroui/react';
import Link from 'next/link';

export default function CitySearch() {
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery<SearchResponse[]>({
    queryKey: ['citySearch', query],
    queryFn: () => searchCities(query),
    enabled: query.length >= 2,
    staleTime: 30 * 1000,
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="w-full max-w-md">
      <label className="block text-sm font-medium mb-2">Search City</label>
      <input
        type="text"
        placeholder="Enter city name..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-default-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary text-lg"
      />

      {isLoading && (
        <div className="mt-2 flex justify-center">
          <Spinner size="sm" />
        </div>
      )}

      {data && data.length > 0 && (
        <Card className="mt-2 w-full">
          <Card.Content className="p-0">
            {data.map((city) => (
              <Link
                key={city.id}
                href={`/weather/${encodeURIComponent(city.name)}`}
                className="block p-3 hover:bg-default-100 transition-colors border-b border-default-200 last:border-b-0"
              >
                <p className="font-semibold">{city.name}</p>
                <p className="text-sm text-default-500">
                  {city.region}, {city.country}
                </p>
              </Link>
            ))}
          </Card.Content>
        </Card>
      )}

      {query.length >= 2 && data && data.length === 0 && !isLoading && (
        <p className="mt-2 text-default-500 text-center">No cities found</p>
      )}
    </div>
  );
}
