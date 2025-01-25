import { getStrapiData } from '@/services/strapi';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';
// app/formations/[formationSlug]/notions/[notionSlug]/page.jsx

// POUR INSOMNIA
// http://localhost:1337/api/notions?filters[slug][$eq]=le-langage-de-la-couleur&filters[formations][slug][$eq]=culture-graphique&populate[0]=sections&populate[1]=sections.blocks
export default async function NotionDetailPage({ params }) {
  const { formationSlug, notionSlug } = params;

  // Construire la query pour Strapi
  const queryParams = {
    filters: {
      slug: { $eq: notionSlug },
      formations: {
        slug: { $eq: formationSlug },
      },
    },
    populate: [
      'sections',         // équivalent à &populate[0]=sections
      'sections.blocks',  // équivalent à &populate[1]=sections.blocks
    ],
  };

  // Appel de mon helper
  const notionContent = await getStrapiData('api/notions', {
    queryParams,
    revalidate: 60, // ou 0 si souhaite SSR pur
  });
  console.log(`🕯️Dans NotionDetailPage >> mes blocks`, notionContent);

  // notionRes devrait contenir { data: [ { id, attributes: {...} } ], meta: {...} }
  if (!notionContent?.data?.length) {
    // Renvoie une page 404 si on ne trouve pas de notion
    notFound();
  }

  // On suppose qu'il n'y a qu'une notion correspondant aux filtres
  const notion = notionContent.data[0];

  // Rendu de votre page
  return (
    <div>
      <h1>{notion?.titre}</h1>
      
      {notion?.sections?.map(section => (

        <section key={section.id}>
          <h2>{section.titreSection}</h2>
          {section.blocks?.map(block => {
            switch (block.__component) {
              case 'texte.titre':
                return <h3 key={block.id}>{block.Titre} <small>Titre</small></h3>;

              case 'texte.paragrapjhe':
                // Attention à l'orthographe "paragrapjhe" qu'on voit dans vos data
                return (
                  <div>
                    <h1>{formationSlug} <small>paragraphe</small></h1>
                    <p key={block.id}>
                      {/* On simplifie l'extraction de "paragrapheRich" */}
                      {block.paragrapheRich?.[0]?.children?.[0]?.text}
                    </p>
                  </div>
                    
                );

              default:
                return null;
            }
          })}
          <hr></hr>
        </section>
      ))}
    </div>
  );
}