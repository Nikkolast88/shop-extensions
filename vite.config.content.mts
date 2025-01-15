import { defineConfig } from 'vite'
import packgeJson from './package.json'
import { isDev, r } from './scripts/utils'
import { shareConfig } from './vite.config.mjs'

export default defineConfig({
  ...shareConfig,
  define: {
    '__DEV__': isDev,
    '__NAME__': JSON.stringify(packgeJson.name),
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
  },
  build: {
    watch: isDev ? {} : undefined,
    outDir: r('extension/dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentScripts/index.ts'),
      name: packgeJson.name,
      formats: ['iife'],
      cssFileName: 'style',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
        extend: true,
      },
    },
  },
})
