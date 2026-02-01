import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          name: "Premium Investment Dashboard",
          short_name: "Smart FD",
          start_url: "/",
          display: "standalone",
          background_color: "#101622",
          theme_color: "#101622",
          orientation: "portrait",
          icons: [
            {
              src: "https://cdn-icons-png.flaticon.com/512/2534/2534204.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable"
            },
            {
              src: "https://cdn-icons-png.flaticon.com/512/2534/2534204.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.origin === 'https://cdn.tailwindcss.com',
              handler: 'CacheFirst',
              options: {
                cacheName: 'tailwind-cdn',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                }
              }
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets',
              }
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            },
            {
              urlPattern: ({ url }) => url.origin === 'https://cdn-icons-png.flaticon.com' || url.origin === 'https://lh3.googleusercontent.com',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'images',
              }
            }
          ]
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});