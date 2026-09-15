import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const base = process.env.AFROVIVE_API_URL;
  if (!base) return NextResponse.json({ message: 'The contact service is not configured.' }, { status: 503 });
  const response = await fetch(`${base.replace(/\/$/, '')}/contact`, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(await request.json()) });
  const body = await response.json().catch(() => ({ message: 'The contact service returned an invalid response.' }));
  return NextResponse.json(body, { status: response.status });
}
