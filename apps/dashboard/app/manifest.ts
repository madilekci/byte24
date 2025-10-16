import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BYTE24 Assignment Dashboard',
    short_name: 'BYTE24 Assignment Dashboard',
    description: 'BYTE24 Assignment Dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#003f59',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/images/og.jpg',
        sizes: '1200x630',
        type: 'image/jpg',
      },
    ],
  };
}
