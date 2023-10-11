import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  // criando um proxy do servidor front para o back
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", secure: false },
    },
  },
  plugins: [react()],
})
