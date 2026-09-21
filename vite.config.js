import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/rsschool-landing-page/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        catalog: resolve(import.meta.dirname, 'catalog.html'),
      },
    },
  },
});
