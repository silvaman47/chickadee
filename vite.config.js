import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',   // so render(<App />) works
    globals: true,          // enables expect, describe, it without imports
    setupFiles: './src/setupTests.jsx',
  },
  base: '/chickadee/'
});
