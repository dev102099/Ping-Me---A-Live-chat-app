import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // Critical for client-side routing
  },
  build: {
    outDir: "dist", // Ensure this matches Render's publish dir
  },
});
