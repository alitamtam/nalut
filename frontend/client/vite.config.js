// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

// Import Tailwind CSS plugin for Vite
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  define: {
    "process.env": {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
