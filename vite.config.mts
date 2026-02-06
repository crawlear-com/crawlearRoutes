import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths({ logFile: true }), VitePWA({
      manifest: {
        name: 'CrawlearRoutes (Crawlear.com)',
        short_name: 'CrawlearRoutes',
        start_url: '/crawlearRoutes/',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/crawlearRoutes/icons/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/crawlearRoutes/icons/512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      }
    })],
  base: "/crawlearRoutes/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.indexOf('node_modules') !== -1) {
            const basic = id.toString().split('node_modules/')[1];
            const sub1 = basic.split('/')[0];
            if (sub1 !== '.pnpm') {
              return sub1.toString();
            }
            const name2 = basic.split('/')[1];
            return name2.split('@')[name2[0] === '@' ? 1 : 0].toString();
          }
        }
      }
    }
  }
})
