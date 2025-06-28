import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    poolOptions: { size: 2 },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts', './tests/setup.tsx'],
    alias: {
      '\\.(png|jpe?g|gif|svg)$': '/tests/__mocks__/img.ts',
    },

    coverage: {
      exclude: [
        '**/**.spec.ts',
        'src/**/*.d.ts',
        'src/database/**',
        'src/**/*.config.ts',
        'src/**/types/**',
        'src/**/*.stories.tsx',
        'src/**/__mocks__/**',
        'src/**/tests/**',
        'src/app/(dashboard)/**',
        'src/assets/icons/',
        'src/lib/constants/**',
        'src/app/**/page.tsx',
        'src/app/**/layout.tsx',
        'src/lib/',
        'src/lib/queries',
        'dist/**',
        'node_modules/**',
        '.next/**',
      ],
      provider: 'istanbul',
      all: true,
      include: ['src/**/*.{ts,tsx,js,jsx}'],

      reporter: ['text', 'html'],
    },
  },
});
