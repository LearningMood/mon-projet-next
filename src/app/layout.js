import '@/styles/global.scss';
export const metadata = {
  title: "Mon site de formations",
  description: "Supports de formation avec accès",
}

import { cookies } from 'next/headers';
import NavBar from '@/components/NavBar';
  
  export default async function RootLayout({ children }) {
    const cookieStore = await cookies();// cookies() est désormais async, mais renvoie un objet utilisable
    const token = cookieStore.get('token')?.value;
  // const token = cookies().get('token')?.value;
  return (
    <html lang="fr">
      <body>
        <NavBar isLogged={!!token} />
        <main>{children}</main>
      </body>
    </html>
  )
}
