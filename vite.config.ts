import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    root: './src/renderer',
    mode: 'development',
    server: {
        port: 3020
    },
    resolve: {
        alias: [
            {find: 'src', replacement: './src'}
        ]
    }
})

