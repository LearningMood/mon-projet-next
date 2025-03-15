import { getStrapiData } from '@/app/api/strapi';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';
import BtnBack from '@/components/ui/BtnBack';
// app/formations/[formationSlug]/notions/[notionSlug]/page.jsx

// POUR INSOMNIA
// http://localhost:1337/api/notions?filters[slug][$eq]=le-langage-de-la-couleur&filters[formations][slug][$eq]=culture-graphique&populate[0]=sections&populate[1]=sections.blocks
// http://localhost:1337/api/notions?filters[slug][$eq]=le-langage-de-la-couleur&filters[formations][slug][$eq]=culture-graphique&populate[0]=sections&populate[1]=sections.blocks&populate[2]=sections.exercices&populate[3]=exercices
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
      'sections.exercices', // ajout exercices associés à 1 section
      'exercices', // ou exercice associés à 1 notion
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
    <main className="container">
      <BtnBack label="Retour aux formations" fallback="/formations" />

      <h1>{notion?.titre}</h1>
      
      {notion?.sections?.map(section => {
        // Récupérer l’array des exercices
        const secExercices = section.exercices || []; // pas .data, c’est un array direct

        return (
        <section key={section.id}>
          <h2>{section.titreSection}</h2>
          {section.blocks?.map(block => {
            
            switch (block.__component) {
              case 'texte.titre':
                return <h3 key={block.id}>{block.Titre} <small>Titre</small></h3>;

              case 'media.image-simple':
                return <h3 key={block.id}>Je suis une image</h3>;

              case 'texte.paragrapjhe':
                return (
                  <div key={block.id}>
                    <p key={block.id}>
                      {/* On simplifie l'extraction de "paragrapheRich" */}
                      {block.paragrapheRich?.[0]?.children?.[0]?.text}
                    </p>
                  </div>
                    
                );

              default:
                return null;
            }
          })} {/* // fin des blocks */}
          {/* EX ASSOCIE A UNE SECTION */}
          {/* Afficher les exercices de la section, si présents */}
          {secExercices.length > 0 && (
            <div>
              <h3>Exercices pour cette section</h3>
              <ul>
                {secExercices.map(e => (
                  <li key={e.id}>
                    {/* JSON montre “titre”, pas "title" */}
                    {e.titre}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )})}
      <hr></hr>
          {/* AJOUT EXERCICES NOTION EN FIN DE NOTION*/}
          {notion.exercices?.length > 0 && (
            <footer>
              <h3>Exercices en fin de Notion :</h3>
              <ul>
                {notion.exercices.map(e => (
                  <li key={e.id}>{e.titre}</li>
                ))}
              </ul>
            </footer>
          )}
    </main>
  );
}