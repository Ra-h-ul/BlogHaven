import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensures the build output goes to 'dist' directory
    sourcemap: true, // Optional: Generates sourcemaps for debugging
  },
  server: {
    port: 5000, // Specify the port you want to run the dev server on
    open: true, // Automatically open the browser when server starts
    proxy: {
      // Proxy API requests to your backend during development
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
