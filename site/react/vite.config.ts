import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import viteReactStylename from "vite-react-stylename";
import genericNames from "generic-names";

const generateScopedName = genericNames("[name]__[local]__[hash:base64:4]");

const alias = {
  "@": resolve(__dirname, "src"),
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5601,
  },
  plugins: [
    react(),
    viteReactStylename({
      generateScopedName,
      filetypes: {
        ".less": {
          syntax: "postcss-less",
        },
      },
      alias,
    }),
  ],
  css: {
    modules: {
      generateScopedName: generateScopedName,
    },
  },
  resolve: {
    alias,
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
