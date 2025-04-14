import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'DCE Manager',
        short_name: 'DCE Manager',
        description: 'Application de marchés publics',
        theme_color: '#ffffff',
        icons: [
          {
            src: '192X192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '512X512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ].filter(Boolean),
  base: "/cleanwriter-design-25/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  
  },
}));
