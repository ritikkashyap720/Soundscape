import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
// https://vite.dev/config/
export default defineConfig({
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Music',
        short_name: 'Music',
        description: 'Music',
        theme_color: '#001919',
        background_color: '#001919',
        display: 'standalone',
        icons: [
          {
            src: '/music-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/music-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/music-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

  ],
})
