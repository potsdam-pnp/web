const path = require('path')
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [react()],
  server: {
    port: 8080
  }
})
// export default {
//   root: path.resolve(__dirname, 'src'),
//   build: {
//     outDir: '../dist'
//   },
//   server: {
//     port: 8080
//   }
// }