//RLa route d'inscription (post)
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, email, password } = await request.json();
  
  const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
  const res = await fetch(`${strapiUrl}/api/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Erreur lors de l\'inscription' },
      { status: res.status }
    );
  }
  
  const response = NextResponse.json({ user: data.user });
  response.cookies.set('token', data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: '/',
    sameSite: 'strict'
  });
  
  return response;
}