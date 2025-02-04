import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import CssMagic from "postcss-magic";

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [CssMagic()],
    },
  },
  build: {
    lib: {
      entry: ["index.ts"],
      cssFileName: "index",
    },
    rollupOptions: {
      output: [
        {
          format: "umd",
          dir: "dist/umd",
          entryFileNames: "[name].umd.js",
          name: "index",
        },
        {
          format: "esm",
          dir: "dist/esm",
          entryFileNames: "[name].esm.js",
        },
      ],
    },
  },
});
