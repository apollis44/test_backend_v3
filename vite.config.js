import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import { generateNonce } from './utils';

export default defineConfig((env) => {
  const envars = loadEnv(env.mode, './');
  const serverURL = new URL(envars.VITE_SERVER_URL ?? 'http://localhost:3000');
  const serverAPIPath = envars.VITE_SERVER_API_PATH ?? '/api';
  const nonce = generateNonce();

  return {
    envDir: './',
    define: {
      __API_PATH__: JSON.stringify(serverAPIPath),
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        external: [
          'vue-3-slider-component',
          '@reside-ic/odinjs',
          'cytoscape',
          'cytoscape-fcose',
          'vue3-popper',
          'd3',
          'crypto'
        ],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        [serverAPIPath]: serverURL.origin,
      },
      headers: {
        'Content-Security-Policy': `default-src 'none'; script-src 'self' 'nonce-${nonce}';`,
      },
    },
  };
});