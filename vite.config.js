import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/alphabet-pazzle",
  server : {
    host : '0.0.0.0',
    port : "3000",
    open : true
  },
  build : {
    sourcemap : true
  },
  CSS : {
    devSourcemap : true
  }
})
