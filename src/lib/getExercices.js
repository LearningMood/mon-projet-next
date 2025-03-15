// services/exerciseService.js
import { getStrapiData } from '@/lib/strapi';

export async function getExercisesByFormationSlug(slug) {
  return await getStrapiData(`exercises?filters[formation][slug][$eq]=${slug}&populate=*`);
}

export async function getExerciseById(id) {
  return await getStrapiData(`exercises/${id}?populate=*`);
}
