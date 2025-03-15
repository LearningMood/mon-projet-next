// services/ficheService.js
import { getStrapiData } from '@/app/api/strapi';

export async function getSyntheseByFormationSlug(slug) {
  // Exemple : "fiche-synthese" est un single type qu’on récupère par rapport à la formation
  // (Selon votre modélisation, ajustez l’endpoint)
  return await getStrapiData(`synthese?filters[formation][slug][$eq]=${slug}&populate=*`);
}
