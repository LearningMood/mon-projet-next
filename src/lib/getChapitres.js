import { getStrapiData } from "@/lib/strapi";

export async function getChapitresByFormationSlug(slug) {
    //  type "plusieurs chapitre " + une formation
    // formation.slug => filtrage
    //24.01. formationsS car many-to-many
    const response = await getStrapiData(`api/chapitres?filters[formation][slug][$eq]=${slug}&populate=*`);
    return response.data; // Récupérez uniquement les données pertinentes - pour éviter de rajouter data
}

// Exemple de fonction helper
export async function getChapitresAndFichesByFormationSlug(formationSlug) {
    // On filtre sur la formation
    // On populate la relation "fiches" (et si besoin "fiches.sections", etc.)
    // Limitation du populate (attentoin cycle)
    // Ici, on ne re‐popule pas le chapitre de chaque fiche.
// Vous obtenez les champs de base de la fiche (id, titre, slug) sans repasser par la relation chapitre, donc plus de cycle.
    const response = await getStrapiData(
      `api/chapitres?filters[formation][slug][$eq]=${formationSlug}&populate[fiches][populate]=sections`
    );
    return response.data; // table des chapitres, chacun avec un champ .fiches
  }
  