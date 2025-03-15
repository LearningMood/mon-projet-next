// Route de vérification d'authentification :
// Route pour obtenir l'utilisateur actuel 
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
  }
  
  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    const res = await fetch(`${strapiUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!res.ok) {
      throw new Error('Token invalide');
    }
    
    const user = await res.json();
    return NextResponse.json({ user });
  } catch (error) {
    // Si le token est invalide, supprimer le cookie
    const response = NextResponse.json(
      { error: 'Non authentifié' },
      { status: 401 }
    );
    response.cookies.delete('token');
    return response;
  }
}