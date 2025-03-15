export default async function NotionDetailPage({ params }) {
    const { slug } = params; // "slug" correspond au paramètre de l'URL dynamique
  
    // Fetch la notion avec le slug
    const notionRes = await getStrapiData('/api/notions', {
      queryParams: {
        'filters[slug][$eq]': slug,
        populate: '*',
      },
    });
  
    const notion = notionRes?.data?.[0];
    if (!notion) {
      return <h1>Notion introuvable</h1>;
    }
  
    const { title, content, cover } = notion.attributes;
  
    return (
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        {cover?.data?.attributes?.url && (
          <img src={cover.data.attributes.url} alt={title} />
        )}
      </div>
    );
  }
  