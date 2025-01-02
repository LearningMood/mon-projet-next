import { getStrapiData } from '@/services/strapi';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


export default async function NotionDetailPage({ params }) {
  const { formationSlug, notionSlug } = params;
  console.log("Dans la page Détail de Notion : ", params); // Ajoute ce log pour vérifier ce que Next.js récupère

  // Appeler l'API Strapi pour récupérer la notion
  const notionRes = await getStrapiData('api/notions', {
  queryParams: {
    filters: {
      slug: { $eq: notionSlug },
      formation: { slug: { $eq: formationSlug } },
    },
    populate: '*',
  },
});
const notion = notionRes?.data?.[0];

  // }
  // const { title, content } = notion.attributes;

  return (
    <div className="container">
      <Link href={`/formations/${formationSlug}`} className="btn">
        Retour formation
      </Link>
      <h1>{notion.titre}</h1>
      <BlocksRenderer content={notion.content} />
    </div>
  );
}
