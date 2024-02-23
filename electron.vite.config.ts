import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwind from 'tailwindcss'
import tsconfigPathPlugIn from 'vite-tsconfig-paths'

const tsconfigPaths = tsconfigPathPlugIn({
  projects: [path.resolve('tsconfig.json')]
})

export default defineConfig({
  main: {
    publicDir: path.resolve(__dirname, 'resources'),
    plugins: [tsconfigPaths, externalizeDepsPlugin()]
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
        '@renderer': path.resolve('src/renderer/src'),
        '@shared': path.resolve('src/shared')
      }
    },
    plugins: [tsconfigPaths, react()]
  }
})
