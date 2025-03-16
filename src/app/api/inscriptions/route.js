import { NextResponse } from 'next/server';
import { getStrapiData } from '@/lib/strapi';

export async function GET(request) {
  try {
    // Extraire le paramètre userId depuis l'URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Vérifier que userId n'est pas null
    if (!userId) {
      return NextResponse.json(
        { error: 'userId est requis' },
        { status: 400 }
      );
    }

    // Appel à Strapi (table "inscriptions") avec filtrage sur userId
    // On peut populate formation, session, etc. selon vos besoins
    const data = await getStrapiData('api/inscriptions', {
      queryParams: {
        'filters[users_permissions_user][id][$eq]': userId,
        populate: ['formation', 'session']
      },
    });

    // data = { data: [ ... ], meta: { ... } }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur /api/inscriptions', error);
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 });
  }
}


// ex : http://localhost:3000/api/inscriptions?userId=2