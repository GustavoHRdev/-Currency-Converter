import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Currency-Converter/', // <--- coloque o nome exato do seu repositório aqui!
});
