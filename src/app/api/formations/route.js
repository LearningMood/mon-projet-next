// import { NextResponse } from 'next/server';
// // je crée cette route finalement

// export async function GET() {
//   const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
//   // On appelle Strapi nous-mêmes
//   const res = await fetch(`${strapiUrl}/api/formations?populate=*`);
//   const data = await res.json();
//   console.log(data);

//   return NextResponse.json(data);
// }

import { NextResponse } from 'next/server';
import { getStrapiData } from '@/lib/strapi'; 
// ou un simple fetch(...) direct si vous préférez

export async function GET() {
  try {
    // Ici, on appelle Strapi via votre helper
    // qui construit l’URL: http://localhost:1337/api/formations?populate=*
    const data = await getStrapiData("api/formations", {
      queryParams: { populate: "*" },
    });

    // On renvoie le résultat tel quel
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur dans /api/formations :", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des formations" },
      { status: 500 }
    );
  }
}
