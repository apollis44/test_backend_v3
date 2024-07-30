import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig((env) => {
  const envars = loadEnv(env.mode, './');
  const serverAPIPath = envars.VITE_SERVER_API_PATH ?? '/api';

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
  };
});