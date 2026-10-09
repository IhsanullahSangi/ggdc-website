import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      // Auto-updates the app silently in the background when you push new code
      registerType: 'autoUpdate', 
      
      // The manifest tells the phone how to install and display the app
      manifest: {
        name: 'Government Girls Degree College Ghotki',
        short_name: 'GGDC Ghotki',
        description: 'Official portal for admissions, results, and curriculum.',
        theme_color: '#0f2841', // Matches your collegeDark Tailwind variable
        background_color: '#f8fafc', // Matches your slate-50 background
        display: 'standalone', // Hides the browser URL bar for a native app feel
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Ensures the icon looks good on Android rounded shapes
          }
        ]
      }
    })
  ]
})