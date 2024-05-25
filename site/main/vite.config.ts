import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteReactStylename from "vite-react-stylename";
import genericNames from "generic-names";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import { resolve } from "path";

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]");

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
  ],
  base: "/main/",
  server: {
    port: 5600,
  },
  css: {
    modules: {
      generateScopedName: generateScopedName,
    },
    preprocessorOptions: {
      less: {
        modifyVars: {
          prefix: "arco-react",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../../dist/main",
    assetsDir: "./assets",
    emptyOutDir: true,
  },
});
