import Bandeau from '@/components/Bandeau';
import { getStrapiData } from '@/lib/strapi';

export const revalidate = 60;
import Link from 'next/link';

// Ici Page principale pour ttes formations
export default async function archiveFormations() {
  // v1/v2
  //  Récupérer toutes les formations
  const formationsRes = await getStrapiData('api/formations/', {
    queryParams: {
      populate: '*', // Optionnel si tu as des relations ou des images
    },
  });

  const formations = formationsRes?.data ?? []; // Accès direct à `data`

    return (
      <main className="container">
        <h1>Liste des Formations</h1>
        <Bandeau size="40" background="tomato" text="Bienvenue aux Formations" />
        <ul>
        {formations.map((formation) => {
            // Accès direct aux propriétés
            const { id, nomFormation, description, slug } = formation;
            return (
              <li key={id}>
                <Link href={`/formations/${slug}`}>
                  <h2>{nomFormation}</h2>
                  <p>{description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    )
}