import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  envDir: '../../',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [PrimeVueResolver()],
    }),
    federation({
      name: 'admin',
      filename: 'admin.js',
      exposes: {
        './route': './src/router/admin.routes.ts',
      },
      shared: ['vue', 'vue-router', 'pinia'],
    }),
  ],
  build: {
    modulePreload: false,
    target: ['esnext'],
    minify: false,
    assetsDir: '',
    cssCodeSplit: false,
    outDir: '../../_web/project/admin',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@common': fileURLToPath(new URL('../common', import.meta.url)),
    },
  },
})
