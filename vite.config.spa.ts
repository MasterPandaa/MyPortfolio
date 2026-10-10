import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Config khusus untuk static SPA build (GitHub Pages & Vercel)
// Menggunakan base "/" jika di Vercel atau VITE_BASE_PATH ditentukan
const basePath = process.env.VITE_BASE_PATH || (process.env.VERCEL ? "/" : "/MyPortfolio/");

export default defineConfig({
  base: basePath,
  css: {
    transformer: "lightningcss",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Ganti root route SSR dengan versi SPA yang tidak memerlukan server
      "./routes/__root": path.resolve(__dirname, "src/routes/__root.spa"),
      // Mock start.ts agar tidak error saat di-import dari routeTree.gen.ts
      [path.resolve(__dirname, "src/start.ts")]: path.resolve(__dirname, "src/start.spa.ts"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    ignoreOutdatedRequests: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    react(),
  ],
});
