import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import viteRenderCode from "./vitePlugin/viteRenderCode";
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5602,
  },
  base: "/vue3/",
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    viteRenderCode(),
    viteMockServe({
      mockPath: './src/mock'
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import '@/assets/styles/theme.less';`,
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    extensions: [".js", ".vue", ".json", ".ts", ".less"],
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../../dist/vue3",
    assetsDir: "./assets",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vueBase: ["vue", "vue-router"],
          pinia: ["pinia"],
          arco: ["@arco-design/web-vue"],
        },
      },
    },
  },
});
