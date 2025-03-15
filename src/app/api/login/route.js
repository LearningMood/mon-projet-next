import { NextResponse } from 'next/server';

/**
 * POST /api/login
 * Expects { identifier, password }
 * Calls Strapi: POST /auth/local
 * Returns user, sets cookie token
 */
export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    // URL de base Strapi (vérifier votre variable d'environnement)
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

    // On appelle Strapi pour l'authentification
    const res = await fetch(`${strapiUrl}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });

    const data = await res.json();

    if (!res.ok) {
      // En cas d'erreur (mauvais identifiants, etc.), on renvoie l'erreur
      return NextResponse.json(
        { error: data.error?.message || 'Identifiants invalides' },
        { status: res.status }
      );
    }

    // Succès : on récupère `jwt` et `user` depuis la réponse Strapi
    // On place le token en cookie HTTP-only
    const response = NextResponse.json({ user: data.user });
    response.cookies.set('token', data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    return NextResponse.json(
      { error: 'Erreur serveur lors de la connexion' },
      { status: 500 }
    );
  }
}
