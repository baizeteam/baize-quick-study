import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteReactStylename from "vite-react-stylename";
import genericNames from "generic-names";
import viteRenderCode from "./vitePlugin/viteRenderCode";

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5601,
  },
  base: "/react/",
  plugins: [
    react(),
    viteReactStylename({
      generateScopedName,
      filetypes: {
        ".less": {
          syntax: "postcss-less",
        },
      },
    }),
    viteRenderCode(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          prefix: "arco-react",
        },
      },
    },
    modules: {
      generateScopedName: generateScopedName,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../../dist/react",
    assetsDir: "./assets",
    emptyOutDir: true,
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
