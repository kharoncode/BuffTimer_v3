import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePWA({ registerType: 'prompt', workbox: { globPatterns: ['**/*{js,css,html,ico,png,svg}'] } })],
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, 'src') },
			{
				find: '@router',
				replacement: path.resolve(__dirname, 'src/router'),
			},
			{
				find: '@assets',
				replacement: path.resolve(__dirname, 'src/assets'),
			},
			{
				find: '@components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{ find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
			{ find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
		],
	},
});
