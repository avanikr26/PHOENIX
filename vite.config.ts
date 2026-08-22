import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    assetsInlineLimit: 0,
    // Phaser alone is ~1.5MB minified; suppress its expected warning
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js — split into its own vendor chunk (~133 kB gzip)
          if (id.includes('node_modules/three')) {
            return 'vendor-three';
          }
          // Phaser — largest vendor, isolated (~340 kB gzip)
          if (id.includes('node_modules/phaser')) {
            return 'vendor-phaser';
          }
          // GSAP animation library (~28 kB gzip)
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          // Remaining node_modules (path-browserify, etc.)
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }
          // All app source → single "app" chunk to avoid circular deps
          // between gameplay ↔ scenes ↔ three scenes
        },
      },
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
  },
});

