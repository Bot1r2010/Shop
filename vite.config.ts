import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/banners': 'http://localhost:4000',
      '/categories': 'http://localhost:4000',
      '/products': 'http://localhost:4000',
      '/users': 'http://localhost:4000',
      '/login': 'http://localhost:4000',
      '/register': 'http://localhost:4000',
    },
  },
})
