import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue2'
import {resolve} from "path";


const libraryName = "VueMultiselect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src")
      }
    ],
    extensions: [".js", ".mjs", ".vue", ".json"]
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: libraryName,
      fileName: (format) => `vue-multiselect.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "moment"],
      output: {
        exports: "named",
        assetFileNames: `vue-multiselect.min.[ext]`,
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          moment: "moment"
        }
      }
    }
  },
});
