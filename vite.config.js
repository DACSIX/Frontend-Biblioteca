import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //Alias @ para imports limpios
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})


