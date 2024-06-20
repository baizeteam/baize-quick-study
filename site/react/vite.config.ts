import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteReactStyleName from "vite-react-stylename";
import genericNames from "generic-names";
import viteRenderCode from "./vitePlugin/viteRenderCode";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import { viteMockServe } from 'vite-plugin-mock'

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5601,
  },
  base: "/react/",
  plugins: [
    react(),
    viteReactStyleName({
      generateScopedName,
      filetypes: {
        ".less": {
          syntax: "postcss-less",
        },
      },
    }),
    vitePluginForArco({
      modifyVars: {
        prefix: "arco-react",
        style: "less",
      },
    }),
    viteRenderCode(),
    viteMockServe({
      mockPath: './src/mock'
    })
  ],
  css: {
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
          highlight: ["highlight.js"],
        },
      },
    },
  },
});
