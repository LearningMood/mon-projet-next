import qs from 'qs';

function getStrapiURL(endpoint, queryParams = {}) {
  // On récupère l’URL de base
  let baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  // Si le baseUrl se termine par un slash, on le retire
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  // Si l'endpoint ne commence pas par un slash, on en ajoute un
  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`;
  }

  // On construit la query string
  const queryString = qs.stringify(queryParams, { encode: false });

  // On renvoie l’URL complète
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
