// Landing page d'accueil
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import { getStrapiData } from "@/lib/strapi";

export default async function Home() {
  const data = await getStrapiData('/api/homepage', { queryParams: { populate: '*' } });
  console.log('Data :', data);
  const content = data.data.content;
  const bandeau = data.data.bandeau.formats.medium.url;

  return (
    <>
      <header 
        className="bandeau bandeau--40 ph-md"
        style={{ backgroundImage: `url('http://localhost:1337${bandeau}')` }}
      >
      </header>
      <BlocksRenderer content={content} />;
      <footer className="">
        
      </footer>
    </>
  );
}
