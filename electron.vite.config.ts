import { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwind from 'tailwindcss'
import tsconfigPathPlugIn from 'vite-tsconfig-paths'

const tsconfigPaths = tsconfigPathPlugIn({
  projects: [resolve('tsconfig.json')]
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
    publicDir: resolve('resources')
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform)
    },
    css: {
      postcss: {
        plugins: [
          tailwind({
            config: './src/renderer/tailwind.config.js'
          })
        ]
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('../shared')
      }
    },
    plugins: [tsconfigPaths, react()]
  }
})
