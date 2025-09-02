import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/adoptly-frontend/', // Замініть <repository-name> на назву вашого репозиторію
});