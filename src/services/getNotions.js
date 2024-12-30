import { getStrapiData } from "./strapi";

export async function getNotionsByFormationSlug(slug) {
    //  type "notion" + une relation
    // formation.slug => filtrage
    const response = await getStrapiData(`api/notions?filters[formation][slug][$eq]=${slug}&populate=*`);
    return response.data; // Récupérez uniquement les données pertinentes - pour éviter de rajouter data
}

export async function getNotionById(notionId) {
  return await getStrapiData(`notions/${notionId}?populate=*`);
}