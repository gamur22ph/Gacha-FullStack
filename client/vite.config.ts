import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // This allows the Docker host to access the Vite dev server
    allowedHosts: ['host.docker.internal'],
    
    // You likely already have these if you're using Docker:
    host: true, 
    port: 5173,
    watch: {
      usePolling: true, // Often needed for Docker file changes to sync
    },
  },
})
