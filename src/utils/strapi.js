const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'; 
// Variable d’environnement à configurer pour pointer vers votre Strapi en prod

/**
 * Fonction générique pour appeler l'API Strapi
 * @param {string} endpoint - Par exemple "/api/homepage" ou "/api/articles"
 * @param {object} [options] - Options à passer à fetch (méthode, headers, body, etc.)
 */
// export async function getStrapiData(endpoint, options = {}) {
  export async function getStrapiData(endpoint, { queryParams = {}, options = {} } = {}) {
  // Ajout options
  // Construire la query string
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

  try {
    // const res = await fetch(`${BASE_URL}${endpoint}`, {
    const res = await fetch(url, {
      ...options,
      // Exemple : next: { revalidate: 10 } si vous souhaitez de l'ISR en Next 13
      next: { revalidate: 60 }, 
    });
    if (!res.ok) {
      throw new Error(`Erreur HTTP ! statut : ${res.status}`);
    }
    console.log(res.json);
    return await res.json();
  } catch (error) {
    console.error('Erreur lors de l\'appel à Strapi :', error);
    throw error;
  }
}
