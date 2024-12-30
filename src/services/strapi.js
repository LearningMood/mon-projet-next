import qs from 'qs';
/**
 * @param {string} endpoint - Par exemple "/api/homepage" ou "/api/articles"
 * @param {object} [options] 
 */
// export async function getStrapiData(endpoint, options = {}) {
export async function getStrapiData(endpoint, { queryParams = {}, options = {} } = {}) {
    const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/';

  // Construire la query string avec qs
  const queryString = qs.stringify(queryParams, { encode: false });
  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
  console.log('URL finale utilisée dans fetch :', url);
  

  try {
    const res = await fetch(url, {
      ...options,
      next: { revalidate: 60 }, // l'ISR en Next 13
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP ! statut : ${res.status}`);
    }
    // console.log(res.json);
    return await res.json();
  } catch (error) {
    console.error('Erreur lors de l\'appel à Strapi :', error);
    throw error;
  }
}
