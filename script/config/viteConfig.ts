import path from 'path'
import vue from '@vitejs/plugin-vue'
import { InlineConfig } from 'vite'
import mViteEslintPlugin from './vitePlugin/mVitePlugin'

const rendererPath = path.resolve(__dirname, '../../src/renderer')
const srcPath = path.resolve(__dirname, '../../src')

export const viteConfig: InlineConfig = {
    plugins: [vue(), mViteEslintPlugin()],
    root   : rendererPath,
    mode   : 'development',
    server : { port: 3021 },
    resolve: {
        alias: [
            { find: 'src', replacement: srcPath },
            { find: 'renderer', replacement: rendererPath },
        ]
    }
}
