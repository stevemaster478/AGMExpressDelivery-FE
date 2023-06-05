import { defineConfig } from "vite";
import { createAngularPlugin } from "vite-plugin-angular";

export default defineConfig({
  plugins: [createAngularPlugin()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
