import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/FluxRate_LandingPage/' : '/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    globals: true,
  },
}));
