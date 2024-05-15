import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/main/",
  server: {
    port: 5600,
  },
  build: {
    outDir: "../../dist/main",
    assetsDir: "./assets",
  },
});
