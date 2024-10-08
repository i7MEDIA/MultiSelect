import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/guide/build.html#library-mode
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, './src/main.js'),
			name: 'MultiSelect',
			fileName: 'MultiSelect.min',
			formats: ['es']
		},
	},
	plugins: [svelte()],
});

