import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Бекенд дозволяє запити тільки з порту 5173, тому не даємо Vite перескакувати на інший
  server: { port: 5173, strictPort: true },
})
