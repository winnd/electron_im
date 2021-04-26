import vue from '@vitejs/plugin-vue'
import path from 'path'
import { InlineConfig } from 'vite'
import mViteEslint from './mVitePluginTry'
const eslint = require('rollup-plugin-eslint').eslint

const rendererPath = path.resolve(__dirname, '../src/renderer')

const vueConfig: InlineConfig = {
    plugins: [vue(), mViteEslint()],
    root   : rendererPath,
    mode   : 'development',
    server : { port: 3021 },
    resolve: {
        alias: [
            { find: 'src', replacement: './src' },
            { find: 'renderer', replacement: rendererPath },
        ]
    }
}

export default vueConfig

