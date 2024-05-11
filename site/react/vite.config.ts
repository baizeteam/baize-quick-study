import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5601,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactBase: ["react", "react-dom", "react-router-dom"],
          mobx: ["mobx", "mobx-react"],
          arco: ["@arco-design/web-react"],
        },
      },
    },
  },
});
