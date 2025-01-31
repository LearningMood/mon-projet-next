import qs from 'qs';

/**
 * Construit l'URL absolue vers l'API Strapi
 * @param {string} endpoint - ex: "api/notions"
 * @param {Object} queryParams - ex: { populate: [...], filters: {...} }
 * @returns {string} URL complète (ex: http://localhost:1337/api/notions?populate=...)
 */
function getStrapiURL(endpoint, queryParams = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/';

  const queryString = qs.stringify(queryParams, {
    encode: false, // ou encodeValuesOnly: true, selon votre besoin
  });

  return `${baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;
}

/**
 * Appelle l'API Strapi en GET
 * @param {string} endpoint - ex: "api/notions"
 * @param {Object} config
 * @param {Object} config.queryParams - paramètres de requête
 * @param {RequestInit} config.fetchOptions - options du fetch (headers, etc.)
 * @param {number} config.revalidate - durée en secondes pour la revalidation ISR
 */
export async function getStrapiData(endpoint, {
  queryParams = {},
  fetchOptions = {},
  revalidate = 60,
} = {}) {
  const url = getStrapiURL(endpoint, queryParams);

  console.log('[getStrapiData] URL finale utilisée :', url);

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      // Ici, Next.js 13 : on peut passer `next: { revalidate }` pour l'ISR
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`❌ Erreur HTTP ! statut : ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('🔥 Erreur lors de l\'appel à Strapi :', error);
    throw error;
  }
}
