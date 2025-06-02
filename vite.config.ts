/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
  },
  resolve: {
    alias: [
      { find: /^react-dom$/, replacement: 'react-dom/profiling' },
      { find: 'scheduler/tracing', replacement: 'scheduler/tracing-profiling' }, // ← fixed quotes
    ],
  },
});
