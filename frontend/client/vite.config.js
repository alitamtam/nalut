import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src", // Alias for easy imports
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    define: {
      // Use Vite's built-in env variable system to map environment variables
      "import.meta.env.VITE_API_URL": JSON.stringify(
        isProduction
          ? "https://www.edulibya.ly" // API URL in production
          : "http://localhost:3000" // API URL for development
      ),
    },
    server: {
      proxy: {
        // Proxy API requests in development
        "/api": {
          target: "http://localhost:3000", // Local API for dev
          changeOrigin: true,
          secure: false, // Disable SSL check for local dev
          rewrite: (path) => path.replace(/^\/api/, ""), // Strip /api prefix
        },
        // Proxy for locales (i18n translations)
        "/locales": {
          target: "http://localhost:3000", // Local backend for locales
          changeOrigin: true,
          secure: false, // Disable SSL check for local dev
          rewrite: (path) => path.replace(/^\/locales/, ""), // Strip /locales prefix
        },
      },
    },
    build: {
      outDir: "dist", // Output directory for production build
      sourcemap: !isProduction, // Only generate source maps in development
      minify: isProduction ? "terser" : false, // Only minify in production
    },
    base: isProduction ? "https://www.edulibya.ly/" : "/", // Base path based on environment
  };
});
