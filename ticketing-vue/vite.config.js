import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression"; // For asset compression
import viteImagemin from "vite-plugin-imagemin"; // For image optimization
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    // Enable gzip or Brotli compression to reduce file size
    viteCompression({
      // Options
      verbose: true, // Log the output
      disable: false, // Set to true to disable compression
      threshold: 10240, // Only compress files larger than this threshold (in bytes)
      algorithm: "gzip", // Compression algorithm (gzip, brotliCompress, deflate, etc.)
      ext: ".gz", // File extension for the compressed file
    }),
    // Optimize images during build
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.7, 0.8] },
      webp: { quality: 75 },
    }),
    VitePWA({
      registerType: "autoUpdate",
      // includeAssets: ["favicon.icon", "robots.txt"],
      manifest: {
        name: "Ticketku",
        short_name: "Ticketku",
        description: "A web application for managing tickets efficiently.",
        theme_color: "#0d7cf2",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/ticketing",
        id: "/ticketing",
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
  base: "/ticketing", // Ensure the base path starts and ends with '/'
  build: {
    target: "es2015", // Set the target to improve compatibility across browsers
    minify: "esbuild", // Ensure ESBuild minification for faster builds
    cssCodeSplit: true, // Enable CSS code splitting to reduce bundle size
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create separate chunks for dependencies, reducing bundle size
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    open: true, // Automatically open the browser on server start
    cors: true, // Enable CORS if you're accessing this server from other domains
  },
});
