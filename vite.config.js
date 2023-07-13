import { defineConfig } from "vite";
import { createAngularPlugin } from "vite-plugin-angular";

export default defineConfig({
  plugins: [createAngularPlugin()],
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  optimizeDeps: {
    // Ignora i warning durante la compilazione
    allowNodeBuiltins: ['warning'],
  },
});
