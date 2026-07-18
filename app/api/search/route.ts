import { NextResponse } from 'next/server';
import weatherApi from '@/lib/axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const { data } = await weatherApi.get('/search.json', {
      params: { q: query },
    });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to search cities';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
