import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression'; // For asset compression
import viteImagemin from 'vite-plugin-imagemin'; // For image optimization
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    // Enable gzip or Brotli compression to reduce file size
    viteCompression({
      // Options
      verbose: true,  // Log the output
      disable: false, // Set to true to disable compression
      threshold: 10240, // Only compress files larger than this threshold (in bytes)
      algorithm: 'gzip', // Compression algorithm (gzip, brotliCompress, deflate, etc.)
      ext: '.gz' // File extension for the compressed file
    }),
    // Optimize images during build
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 }, // Adjust quality to balance size and quality
      pngquant: { quality: [0.65, 0.8], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'removeEmptyAttrs', active: true },
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api\.com\/.*$/, // Adjust this to your API URL
            handler: 'NetworkFirst', // Cache strategy
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/, // Example for caching Google Fonts
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/ticketing', // Ensure the base path starts and ends with '/'
  build: {
    target: 'es2015', // Set the target to improve compatibility across browsers
    minify: 'esbuild', // Ensure ESBuild minification for faster builds
    cssCodeSplit: true, // Enable CSS code splitting to reduce bundle size
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Create separate chunks for dependencies, reducing bundle size
          if (id.includes('node_modules')) {
            return 'vendor';
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
