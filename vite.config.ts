import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "@features": path.resolve(__dirname, './src/features'),
      "@components": path.resolve(__dirname, './src/components'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@layouts": path.resolve(__dirname, './src/layouts'),
      "@lib": path.resolve(__dirname, './src/lib'),
      "@routes": path.resolve(__dirname, './src/routes'),
      "@store": path.resolve(__dirname, './src/store'),
      "@types": path.resolve(__dirname, './src/types'),
      "@constants": path.resolve(__dirname, './src/constants')
    }
  }
})
