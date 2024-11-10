import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { VitePWA } from "vite-plugin-pwa";
import sitemapPlugin from "vite-plugin-sitemap";
import { visualizer } from 'rollup-plugin-visualizer'; // Add this for bundle analysis
import legacy from '@vitejs/plugin-legacy'; // Add this for legacy browser support

export default defineConfig({
  plugins: [
    vue(),
    // Add legacy browser support
    legacy({
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    sitemapPlugin({
      hostname: 'https://sandbox2.panemu.com/ticketing/',
      routes: [
        '/', '/all-for-you', '/checkout', '/sign_up', '/otp', '/login',
        '/events_create', '/edit-event/1', '/my_tickets', '/my_tickets/1',
        '/account', '/my_events', '/pricing', '/about', '/terms', '/privacy',
        '/contact'
      ],
    }),
    // Optimize compression settings
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024, // Lower threshold to compress more files
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: true // Remove original files after compression
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      deleteOriginFile: true
    }),
    // Enhanced image optimization
    viteImagemin({
      gifsicle: { optimizationLevel: 7, interlaced: false },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75, progressive: true }, // Slightly lower quality for better performance
      pngquant: { quality: [0.65, 0.8], speed: 4 },
      webp: { quality: 75, lossless: false, method: 6 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true },
          { name: 'cleanupIDs', active: true },
          { name: 'removeDimensions', active: true }
        ]
      },
    }),
    // Enhanced PWA configuration
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
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
            urlPattern: /^https:\/\/sandbox2\.panemu\.com\/ticketing\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(js|css|html)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          },
          {
            urlPattern: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true
      }
    }),
    // Add bundle analyzer in production
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/ticketing/",
  build: {
    target: "esnext",
    minify: "terser", // Change to terser for better minification
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      }
    },
    cssCodeSplit: true,
    cssMinify: 'lightningcss', // Use lightningcss for better CSS minification
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'utils': ['axios', 'lodash'],
          'auth': ['./src/views/auth/Login.vue', './src/views/auth/Register.vue', './src/views/auth/Otp.vue'],
          'main': ['./src/views/Dashboard.vue', './src/views/EventCategory.vue'],
          'account': ['./src/views/Account.vue', './src/views/MyEvent.vue', './src/views/MyEvent.vue']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2/.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1500,
    sourcemap: false,
    reportCompressedSize: false
  },
  server: {
    open: true,
    cors: true,
    strictPort: true,
    historyApiFallback: true,
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      '@headlessui/vue',
      '@heroicons/vue'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  // Add preview configuration
  preview: {
    port: 8080,
    strictPort: true,
    open: true,
    cors: true
  }
});