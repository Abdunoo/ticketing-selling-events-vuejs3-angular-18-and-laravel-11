import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";
import viteLegacyPlugin from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    vue(),
    viteLegacyPlugin({
      targets: ['defaults', 'not IE 11'], // Configure supported browsers (ES5 fallback)
      modernPolyfills: true, // This enables some modern features for older browsers
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // Include if async/await is used
    }),
    // Enable gzip & Brotli compression for production assets
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    // Image optimization settings
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80, progressive: true },
      pngquant: { quality: [0.65, 0.8], speed: 1 },
      webp: { quality: 80 },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: true },
        ],
      },
    }),
    // Progressive Web App settings
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Ticketku",
        short_name: "Ticketku",
        description: "A web application for managing tickets efficiently.",
        theme_color: "#0d7cf2",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/ticketing/",
        id: "/ticketing/",
        icons: [
          {
            src: "/ticketing/assets/image/logo_192x192.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "/ticketing/assets/image/logo_512x512.webp",
            sizes: "512x512",
            type: "image/webp",
          },
          {
            src: "/ticketing/assets/image/logo_512x512_maskable.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/ticketing/",
  build: {
    chunkSizeWarningLimit: 1000,  // Set the chunk size warning limit to 1000 kB
    minify: "esbuild",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("vue")) {
              return "vue"; // Separate Vue ecosystem libraries
            }
            return "vendor"; // Separate all other dependencies
          }
          if (id.includes('node_modules/lodash')) {
            return 'lodash';  // Separate Lodash into its own chunk
          }
        },
      },
    },
  },
  server: {
    open: true,
    cors: true,
    strictPort: true, // Ensures server only starts if the port is available
    historyApiFallback: true,
  },
});
