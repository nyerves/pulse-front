import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  let base = ''
  // const local = 'http://127.0.0.1:5500/_web/project'
  // let pathToAdmin = local + '/admin/admin.js'

  // To production
  if (command === 'build') {
    const env = loadEnv(mode, path.resolve(__dirname, '../..'))

    base = env?.VITE_PREFIX || '/'
    // pathToAdmin = '../build/admin/admin.js'
  }

  return {
    base,
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
        name: 'main',
        filename: 'main.js',
        remotes: {
          // admin: pathToAdmin,
        },
        shared: ['vue', 'vue-router', 'pinia'],
      }),
    ],
    build: {
      modulePreload: false,
      target: ['esnext'],
      minify: false,
      assetsDir: 'assets',
      cssCodeSplit: false,
      outDir: '../../_web/',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@common': fileURLToPath(new URL('../common', import.meta.url)),
      },
    },
  }
})
