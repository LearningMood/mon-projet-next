import Bandeau from '@/components/Bandeau';
import { getStrapiData } from '@/lib/strapi';
import Container from '@/components/blockComponents/Container';
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
      <Container size="large" hSpacing="large">
        <h1>Liste des Formations</h1>
        <Bandeau size="40" background="tomato" text="Bienvenue aux Formations" />
        {formations.map((formation) => {
            // Accès direct aux propriétés
            const { id, nomFormation, description, slug } = formation;
            return (
              <div key={id}>
                <Link href={`/formations/${slug}`}>
                  <h2>{nomFormation}</h2>
                  <p>{description}</p>
                </Link>
              </div>
            );
          })}
        </Container>
    )
}