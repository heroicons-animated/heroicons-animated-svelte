import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const appDir = fileURLToPath(new URL('.', import.meta.url));
const iconsDir = resolve(appDir, './src/lib/icons');
const packagesDir = resolve(appDir, '.');

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@ha-svelte-icons': iconsDir
		}
	},
	server: {
		fs: {
			allow: [packagesDir]
		}
	}
});
