// import eslint from '@rollup/plugin-eslint'
import { Plugin } from 'vite'
import path from 'path'
// import eslint from 'eslint'
const { ESLint } = require('eslint')
const { createFilter } = require('@rollup/pluginutils')

// import eslint from '@rollup/plugin-eslint'
function normalizePath(id: string) {
    return path
        .relative(process.cwd(), id)
        .split(path.sep)
        .join('/')
}

let pluginHost = 'rollup'
let globalErrors = false

/**
 * 自己组装的vite的eslint插件, vue-eslint-parser不好用
 * @param options
 */
const mViteEslintPlugin = (options = { 'include': ['src/**/*.vue', 'src/**/*.js'] } as any): Plugin => {
    const eslint = new ESLint()
    const filter = createFilter(options.include, options.exclude || /node_modules/)
    return {
        'name': 'vite-eslint-rollup',

        async transform(src, id: string) {
            const file = normalizePath(id)
            const formatter = await eslint.loadFormatter('stylish')
            if (!filter(id) || await eslint.isPathIgnored(file)) {
                return null
            }

            const report = await eslint.lintFiles(file)
            const hasErrors = report.some((result: any) => result.errorCount !== 0)

            const result = formatter.format(report)
            if (result) {
                // eslint-disable-next-line no-console
                this.warn(result)
            }

            if (hasErrors) {
                globalErrors = true

                if (pluginHost === 'vite') {
                    this.error(result)
                }
            }

            return null
        },

        configureServer() {
            console.log('WERE IN VITE LAND NOW!')
            pluginHost = 'vite'
        },

        buildEnd() {
            if (pluginHost === 'rollup' && globalErrors) {
                this.error('ESLint found errors')
            }

            console.log('1111')
        }

    }
}
export default mViteEslintPlugin

