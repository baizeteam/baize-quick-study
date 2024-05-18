import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "auto-import-arco",
    },
  ],
  base: "/main/",
  server: {
    port: 5600,
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          prefix: "arco-react",
        },
      },
    },
  },
  build: {
    outDir: "../../dist/main",
    assetsDir: "./assets",
  },
});
