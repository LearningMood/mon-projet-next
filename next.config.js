/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Désactive les erreurs liées à TypeScript
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Si ton Strapi tourne sur le port 1337
        pathname: '/uploads/**', // Permet toutes les images du dossier uploads
      },
    ],
  },
};

module.exports = nextConfig;
