/// <reference types="vitest" />
import type { ManifestV3Export } from "@crxjs/vite-plugin";
import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest: manifest as ManifestV3Export })],
  server: {
    host: true,
    port: 3001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "happy-dom",
    unstubGlobals: true,
    unstubEnvs: true,
    setupFiles: "src/tests/setup.ts",
  },
});
