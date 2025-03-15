This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## STRUCTURE DOSSIERS
app/api/ rergoupe désormais les routes API internes.
Chaque dossier sous api/ (ex. logout, me, register, login) correspond à une sous-route :

- app/api/logout/route.js => répondra à /api/logout
>A. Endpoint API : le fichier app/api/logout/route.js contient la logique pour supprimer le cookie d'authentification (token) via une requête POST
>B. Dans le navigateur, peutprendre la forme d'un btn de deconnexion dans la nav ou d'une page dédiée.
Pour l'instant, un BtnLogout dans la navigation.
lorsqu'on clique dessus, effectue une requête POST vers /api/logoute


- app/api/me/route.js => répondra à /api/me
>A. la route, endpoint API crée 
Le fichier app/api/me/route.js vérifie l'existence du cookie token et fait un appel vers Strapi pour obtenir les infos de l'utilisateur :
>B. dans le navigateur : http://localhost:3000/profile
Pour que l'utilisateur voit sa page, création d'une dans (privatePages) > profile > page.jsx

- app/api/register/route.js => /api/register
>A. Quand un client (le front ou un autre service) envoie une requête POST /api/register, c’est ce fichier qui traite la requête.
Il va appeler Strapi pour créer un compte (/auth/local/register), puis, en cas de succès, gérer le cookie token.

>B. Dans le navigateur : 3000/register affiche la page de (publicPages) > register > page.jsx


Dans chacune de ces routes, on peut définir les méthodes GET, POST, etc.
Le fichier middleware.js reste à la racine : c’est lui qui va intercepter les requêtes vers certaines pages ou répertoires pour vérifier le cookie token et rediriger si besoin.

