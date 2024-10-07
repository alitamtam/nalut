import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import process from "process";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src", // Aliasing to easily import from the src folder
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    define: {
      // Map VITE_API_URL based on the environment (development or production)
      "import.meta.env": {
        VITE_API_URL: JSON.stringify(
          process.env.VITE_API_URL || "http://localhost:3000"
        ),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000", // Local backend API for development
          changeOrigin: true,
          secure: false, // Keep this false for local development (HTTP)
          rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" from the request path
        },
      },
    },
    build: {
      outDir: "dist", // Specify the output directory for the production build
      sourcemap: isProduction, // Enable source maps for production if needed
    },
    base: isProduction ? "https://edulibya.ly/" : "/", // Use base path based on the environment
  };
});
