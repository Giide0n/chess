import { sveltekit } from '@sveltejs/kit/vite';
import wasmPack from 'vite-plugin-wasm-pack';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), wasmPack('./rust')]
};

export default config;
