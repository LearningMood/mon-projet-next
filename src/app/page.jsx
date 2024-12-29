import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import { getStrapiData } from "@/utils/strapi";
// import styles from "./page.module.css";
import '@/styles/master.scss';

export default async function Home() {
  // const data = await getStrapiData('/api/homepage');
  const data = await getStrapiData('/api/homepage', { queryParams: { populate: '*' } });
  console.log('Debug saleté de data :', data);
  const content = data.data.content;
  const bandeau = data.data.bandeau.formats.medium.url;

  return (
    <div className="">
      {/* <main className={styles.main}> */}
      
        <header className="container-full">
          {/* <img src={`http://localhost:3000/api${bandeau}`} /> */}
          <img src={`http://localhost:1337${bandeau}`} alt="" />
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
