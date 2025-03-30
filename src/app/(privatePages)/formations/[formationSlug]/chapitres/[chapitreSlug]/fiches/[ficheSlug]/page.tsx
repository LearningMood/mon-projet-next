import { notFound } from 'next/navigation';
import BtnBack from '@/components/ui/BtnBack';
import { getStrapiData } from '@/lib/strapi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';


type FicheDetailPageProps = {
  params: {
    formationSlug: string;
    chapitreSlug: string;
    ficheSlug: string;
  };
};
// Là, je dois filtrer les fiches par leur slug et le slug du chapitre parent, et le slug de la formation parente de ce chapitre.
// http://localhost:1337/api/fiches?filters[slug][$eq]=le-detourage-au-lasso&filters[chapitre][slug][$eq]=le-detourage&filters[chapitre][formation][slug][$eq]=photoshop-niv1&populate[0]=sections&populate[1]=sections.blocks
export default async function FicheDetailPage({ params }: FicheDetailPageProps) {
   const { formationSlug, chapitreSlug, ficheSlug } = await params;

  /**
   * On suppose qu'en base Strapi, vous avez un modèle "fiche"
   *  - champ "slug"
   *  - relation "chapitre" qui a lui-même un "slug" et une relation "formation" avec un "slug".
   *
   * On veut donc filtrer la fiche qui correspond :
   *  1. Au slug = ficheSlug
   *  2. Dont le chapitre parent a slug = chapitreSlug
   *  3. Dont la formation parente de ce chapitre a slug = formationSlug
   *
   * On récupère aussi les sections et blocks de chaque section.
   */

  const queryParams = {
    filters: {
      slug: { $eq: ficheSlug },
      chapitre: {
        slug: { $eq: chapitreSlug },
        formation: {
          slug: { $eq: formationSlug },
        },
      },
    },
    populate: [
      'sections',
      'sections.blocks',
      // si vous avez d'autres relations, par ex. un champ "exercices" directement sur la fiche, ajoutez-les ici
      // 'exercices',
    ],
  };

  // Appel de votre helper pour interroger l’API Strapi
  const ficheRes = await getStrapiData('api/fiches', {
    queryParams,
    revalidate: 60, // revalidate à 60s par exemple
  });

  // ficheRes => structure { data: [ { id, attributes: {...} } ], meta: {...} }
  if (!ficheRes?.data?.length) {
    notFound();
  }

  // Normalement, il n’y a qu’une fiche trouvée pour ces filtres
  const fiche = ficheRes.data[0];
  if (!fiche) {
    notFound();
  }
  

  /**
   * Si vous avez un champ "nature" (ou "type") sur la fiche
   * pour déterminer si c’est une notion, un exercice, etc. :
   *    const { nature } = ficheAttributes;
   *    // vous pouvez l’exploiter pour afficher un layout différent
   */

  // Extraction des sections
  const sections = fiche.sections || [];

  return (
    <main className="container">
      <BtnBack label="Retour au chapitre" fallback={`/formations/${formationSlug}/chapitres/${chapitreSlug}`} />

      <h1>{fiche.titre}</h1>
      <p>Type de fiche : {fiche.typeFiche}</p>

      {sections.map((section: any) => {
        const secId = section.id; // ou section.__component si c’est géré différemment
        const secTitle = section.titreSection || 'Section sans titre';
        const blocks = section.blocks || [];

        return (
          <section key={secId}>
            <h2>{secTitle}</h2>
            
            {blocks.map((block: any) => {
              // On reproduit la logique du switch par __component
              switch (block.__component) {
                case 'texte.titre':
                  return (
                    <h3 key={block.id}>
                      {block.Titre} <small>Titre</small>
                    </h3>
                  );

                case 'media.image-simple':
                  return <p key={block.id}>[Ici, une image simple]</p>;

                case 'texte.paragraphe':
                  // Attention à l’orthographe : paragrapjhe → paragraphe
                  return (
                    <div key={block.id}>
                      <p>{block.paragrapheRich?.[0]?.children?.[0]?.text}</p>
                    </div>
                  );

                // Ajoutez d’autres cases en fonction de vos composants
                default:
                  return null;
              }
            })}
          </section>
        );
      })}
    </main>
  );
}
