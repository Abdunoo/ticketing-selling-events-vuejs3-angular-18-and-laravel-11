import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    // Gzip, Brotli, and Zopfli compressions
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
    viteCompression({
      algorithm: "zopfli",
      ext: ".gz",
    }),
    // Image optimization
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80, progressive: true },
      pngquant: { quality: [0.65, 0.8], speed: 1 },
      webp: { quality: 70 },
      svgo: {
        plugins: [
          { removeViewBox: false },
          { removeEmptyAttrs: true },
        ],
      },
    }),
    // PWA with aggressive caching
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
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/sandbox2\.panemu\.com\/.*$/,
            handler: "NetworkFirst",
          },
          {
            urlPattern: /\.(?:js|css|html)$/,
            handler: "StaleWhileRevalidate",
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
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.includes("vue") ? "vue" : "vendor";
          }
        },
        chunkFileNames: (chunkInfo) =>
          chunkInfo.name === "vue" ? "vue.js" : "[name]-[hash].js",
        entryFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  server: {
    open: true,
    cors: true,
    strictPort: true,
    historyApiFallback: true,
  },
  optimizeDeps: {
    include: ["vue", "axios"],
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
});
