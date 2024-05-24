import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteReactStylename from "vite-react-stylename";
import genericNames from "generic-names";
import viteRenderCode from "./vitePlugin/viteRenderCode";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import viteAddCdnScript from "vite-add-cdn-script";
import externalGlobals from "rollup-plugin-external-globals";

// 需要使用cdn库
const externals = {
  react: "React",
  "react-dom": "ReactDOM",
  "@remix-run/router": "@remix-run/router",
  "react-router": "react-router",
  "react-router-dom": "ReactRouterDOM",
  // lodash: "_",
  // axios: "axios",
  // dayjs: "dayjs",
  // antd: "antd",
};

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
    vitePluginForArco({
      modifyVars: {
        prefix: "arco-react",
        style: "less",
      },
    }),
    viteRenderCode(),
    viteAddCdnScript({
      customScript: {},
    }),
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
      external: [...Object.keys(externals)],
      plugins: [externalGlobals(externals)],
      output: {
        manualChunks: {
          // reactBase: ["react", "react-dom", "react-router-dom"],
          // mobx: ["mobx", "mobx-react"],
          arco: ["@arco-design/web-react"],
          highlight: ["highlight.js"],
        },
      },
    },
  },
});
