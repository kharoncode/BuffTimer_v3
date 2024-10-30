import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: { globPatterns: ['**/*{js,css,html,ico,png,svg}'] },
			manifest: {
				name: 'Ideo - BuffTimer',
				short_name: 'BuffTimer',
				description: 'The best app ever !',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'icons/icon-120x120.png',
						sizes: '120x120',
						type: 'image/png',
					},
					{
						src: 'icons/icon-480x480.png',
						sizes: '480x480',
						type: 'image/png',
					},
				],
			},
		}),
	],
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
