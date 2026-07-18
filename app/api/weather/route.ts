import { NextResponse } from 'next/server';
import weatherApi from '@/lib/axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('q') || 'London';
  const days = searchParams.get('days') || '1';

  try {
    const { data } = await weatherApi.get('/forecast.json', {
      params: { q: city, days },
    });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch weather';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
