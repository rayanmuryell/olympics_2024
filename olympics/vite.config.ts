import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/medals': {
        target: 'https://api.olympics.kevle.xyz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/medals/, '/medals'),
      },
    },
  },
});
