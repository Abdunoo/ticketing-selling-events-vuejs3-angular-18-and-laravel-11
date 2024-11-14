import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import sitemapPlugin from "vite-plugin-sitemap";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

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
      threshold: 1024,
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true,
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp|avif)$/i,
      includePublic: true,
      logStats: true,
      webp: {
        quality: 50,
        lossless: false,
        force: true
      },
      svg: {
        quality: 50,
        lossless: false,
        force: true
      },
      avif: {
        quality: 80,
        lossless: false,
        force: true
      }
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
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    cssMinify: true,
    reportCompressedSize: false
  },
  server: {
    open: true,
    cors: true,
    strictPort: true,
    historyApiFallback: true,
    warmup: {
      clientFiles: [
        './src/views/*.vue',
        './src/components/*.vue'
      ]
    }
  },
  optimizeDeps: {
    include: ["vue", "axios"],
  },
});
