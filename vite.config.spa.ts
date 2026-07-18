import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Config khusus untuk static SPA build (GitHub Pages)
// Tidak menggunakan @tanstack/react-start karena tidak perlu server SSR
export default defineConfig({
  base: "/MyPortfolio/",
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

