import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import { getStrapiData } from "@/api/strapi";

export default async function Home() {
  const data = await getStrapiData('/api/homepage', { queryParams: { populate: '*' } });
  console.log('Data :', data);
  const content = data.data.content;
  const bandeau = data.data.bandeau.formats.medium.url;

  return (
    <div className="">
        <header 
          className="container-full bandeau bandeau--40"
          style={{ backgroundImage: `url('http://localhost:1337${bandeau}')` }}
        >
        </header>

        <main className="container">
          <BlocksRenderer content={content} />;
          <ol>
            <li>Save and see your changes instantly.</li>
          </ol>

         </main>
      <footer className="">
        
      </footer>
    </div>
  );
}
