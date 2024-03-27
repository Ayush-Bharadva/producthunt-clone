import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		host: "producthunt-clone-5173.netlify.app",
		https: {
			key: fs.readFileSync("./cert/key.pem"),
			cert: fs.readFileSync("./cert/cert.pem"),
		},
	},
	preview: {
		port: 4000,
	},
	build: {
		outDir: "build",
	},
});
