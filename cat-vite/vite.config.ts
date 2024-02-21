import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@shared': path.resolve(_dirname, './shared');
  //   }
  // }
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]__[hash:base64:2]"
    }
  },
})
