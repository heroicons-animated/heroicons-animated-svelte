import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

const appDir = fileURLToPath(new URL(".", import.meta.url));
const iconsDir = resolve(appDir, "./src/lib/icons");
const packagesDir = resolve(appDir, ".");

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      "@heroicons-animated/svelte": iconsDir,
    },
  },
  server: {
    fs: {
      allow: [packagesDir],
    },
  },
});
