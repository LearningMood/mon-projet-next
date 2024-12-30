
import Link from 'next/link';
import { getStrapiData } from '@/services/strapi';
import { getNotionsByFormationSlug } from "@/services/getNotions";
import { getExercisesByFormationSlug } from "@/services/getExercices"; 
import { getSyntheseByFormationSlug } from "@/services/getSyntheses";
import CardItem from '@/components/CardItem';

// Ici Page principale pour une formation donnée
export default async function pageFormation({ params }) {
    const { formationSlug } = params; // Je récupère le params comme filtre (ici le nom de la formation)
    console.log("le Params de la page : ", params);

    const formationRes = await getStrapiData('api/formations', {
      queryParams: {
        'filters[slug][$eq]': formationSlug,
        populate: '*', // Optionnel si tu veux inclure des relations
      },
    });
  
    const formation = formationRes?.data?.[0]; // Accès direct à `data`
    if (!formation) {
      return <h1>Formation introuvable</h1>;
    }
  
    const { nomFormation, description, createdAt, imageFeat } = formation;


    
    // on fetch tout en parallèle :
    const notions = await getNotionsByFormationSlug(formationSlug);


    console.log("Notions récupérées :", notions);

    return (
        <main className="container">
            <h1>Je suis la page Principale de la formation {formation.nomFormation}</h1>
            <h2>Ici, les notions : </h2>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {notions.map((notion) => (
                    <Link
                        href={`/formations/${formationSlug}/notions/${notion.slug}`}
                        // href={`/formation/${formationSlug}/notions/${notionSlug}`}
                        style={{
                        display: 'block',
                        width: '300px',
                        border: '1px solid #ccc',
                        borderRadius: 4,
                        overflow: 'hidden',
                        textDecoration: 'none',
                        color: '#000',
                        }}
                    >
                        <CardItem
                            key={notion.id}
                            titre={notion.titre}
                            description={notion.description}
                            imageFeat={`http://localhost:1337${notion.imageFeat.formats.thumbnail.url}`} 
                            formationName="coucou"
                        ></CardItem>
                    </Link>
                ))}
            </ul>
        </main>
    )
}