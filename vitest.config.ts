import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,

    coverage: {
      provider: 'istanbul',
      all: true,
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['.next/**', 'node_modules/**', '**/*.d.ts'],
      reporter: ['text', 'html'],
    },
  },
});
