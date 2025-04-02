
import Link from 'next/link';
import { getStrapiData } from '@/lib/strapi';
import { getNotionsByFormationSlug } from "@/lib/getNotions";
import { getChapitresByFormationSlug, getChapitresAndFichesByFormationSlug } from "@/lib/getChapitres";
import Container from '@/components/blockComponents/Container';
import { getExercisesByFormationSlug } from "@/lib/getExercices"; 
import { getSyntheseByFormationSlug } from "@/lib/getSyntheses";
import CardItem from '@/components/CardItem';
import BtnBack from '@/components/ui/BtnBack';

// Ici Page principale pour une formation donnée
export default async function pageFormation({ params }) {
    const { formationSlug, notionSlug } = await params; // Je récupère le params comme filtre (ici le nom de la formation)
    // console.log("le Params de la page : ", params);

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
    // const notions = await getNotionsByFormationSlug(formationSlug);
    // const chapitres = await getChapitresByFormationSlug(formationSlug);
    const chapitres = await getChapitresAndFichesByFormationSlug(formationSlug);

    // console.log("Notions récupérées :", notions);
    console.log("Chapitres récupérés + fiches :", chapitres);

    return (
        <Container size="full" hSpacing="large">
            <BtnBack label="Retour aux formations" fallback="/formations" />
            <h1>Formation {formation.nomFormation}</h1>

            {/* 2) On boucle sur les chapitres */}
            {chapitres.map((chap) => {
                const fiches = chap.fiches || []; // ex: array de fiches

                return (
                    <Container size="small" key={chap.id}>
                    <h2>{chap.titre}</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {fiches.map((fiche) => (
                            <Link
                            href={`/formations/${formationSlug}/chapitres/${chap.slug}/fiches/${fiche.slug}`}
                            key={fiche.id}
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
                                key={fiche.id}
                                titre={fiche.titre}
                                description={fiche.description}
                                imageFeat={
                                    fiche.imageFeat?.formats?.thumbnail?.url
                                    ? `http://localhost:1337${fiche.imageFeat.formats.thumbnail.url}`
                                    : 'http://localhost:1337/uploads/fallback-image.png'
                                  }
                                formationName={nomFormation}
                                sections={fiche.sections}
                            ></CardItem>
                        </Link>

                        ))}
                    </div>
                </Container>
                );
            })}
        </Container>
    )
}