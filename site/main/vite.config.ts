import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteReactStylename from "vite-react-stylename";
import genericNames from "generic-names";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import viteAddCdnScript from "vite-add-cdn-script";
import externalGlobals from "rollup-plugin-external-globals";

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]");

const externals = {
  react: "React",
  "react-dom": "ReactDOM",
  // "@remix-run/router": "@remix-run/router",
  // "react-router": "react-router",
  // "react-router-dom": "ReactRouterDOM",
  // lodash: "_",
  // axios: "axios",
  // dayjs: "dayjs",
  // antd: "antd",
};

// https://vitejs.dev/config/
export default defineConfig({
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
    viteAddCdnScript({}),
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
    emptyOutDir: true,
    rollupOptions: {
      external: [...Object.keys(externals)],
      plugins: [externalGlobals(externals)],
    },
  },
});
