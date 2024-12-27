import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import { getStrapiData } from '@/utils/strapi';
import styles from "./page.module.css";

export default async function Home() {
  const data = await getStrapiData('/api/homepage');
  console.log('Debug saleté de data :', data);
  const content = data.data.content;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BlocksRenderer content={content} />;
        <ol>
          <li>Save and see your changes instantly.</li>
        </ol>

      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
