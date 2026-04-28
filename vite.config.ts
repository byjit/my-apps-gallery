import { fileURLToPath, URL } from "node:url";
import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		devtools(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		viteReact(),
		tailwindcss(),
		contentCollections(),
		// Compresses PNG/JPG/WebP/AVIF/SVG/GIF assets in `public/` and emitted
		// bundles at build time via sharp + svgo. No-op in dev.
		ViteImageOptimizer({
			png: { quality: 80 },
			jpeg: { quality: 80 },
			jpg: { quality: 80 },
			webp: { lossless: false, quality: 80 },
			avif: { lossless: false, quality: 70 },
			// svgo v4 dropped `removeViewBox` from preset-default, so viewBox is
			// preserved without an explicit override.
			svg: {
				multipass: true,
				plugins: ["preset-default"],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
