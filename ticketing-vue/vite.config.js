import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";
import sitemapPlugin from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    vue(),
    sitemapPlugin({
      hostname: 'https://sandbox2.panemu.com/ticketing/',
      routes: [
        '/', '/all-for-you', '/checkout', '/sign_up', '/otp', '/login',
        '/events_create', '/edit-event/1', '/my_tickets', '/my_tickets/1',
        '/account', '/my_events', '/pricing', '/about', '/terms', '/privacy',
        '/contact'
      ],
    }),
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
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80, progressive: true },
      pngquant: { quality: [0.65, 0.8], speed: 1 },
      webp: { quality: 70 },
      svgo: { plugins: [{ removeViewBox: false }, { removeEmptyAttrs: true }] },
    }),
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
            urlPattern: /.*\.(?:js|css|html|json)/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-assets',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
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
            if (id.includes("vue")) {
              return "vue";
            }
            return "vendor";
          }
        },
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
});
