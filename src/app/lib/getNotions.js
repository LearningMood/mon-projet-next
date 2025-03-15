import { getStrapiData } from "@/app/api/strapi";

export async function getNotionsByFormationSlug(slug) {
    //  type "notion" + une relation
    // formation.slug => filtrage
    //24.01. formationsS car many-to-many
    const response = await getStrapiData(`api/notions?filters[formations][slug][$eq]=${slug}&populate=*`);
    return response.data; // Récupérez uniquement les données pertinentes - pour éviter de rajouter data
}

// utile / utilisée ?
export async function getNotionById(notionId) {
  return await getStrapiData(`notions/${notionId}?populate=*`);
}