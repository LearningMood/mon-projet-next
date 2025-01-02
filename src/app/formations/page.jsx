import { getStrapiData } from '@/services/strapi';
export const revalidate = 60;
import Link from 'next/link';

// Ici Page principale pour une formation donnée
export default async function archiveFormations() {
  // Récupérer toutes les formations
  const formationsRes = await getStrapiData('api/formations', {
    queryParams: {
      populate: '*', // Optionnel si tu as des relations ou des images
    },
  });

  const formations = formationsRes?.data ?? []; // Accès direct à `data`

    return (
        <section style={{ padding: '1rem' }}>
      <h1>Liste des Formations</h1>
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
    </section>
    )
}