import { createServer, InlineConfig, ViteDevServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import * as esbuild from 'esbuild'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { BuildOptions } from 'esbuild'

const ELECTRON_BIN = process.platform === 'win32' ? 'electron.cmd' : 'electron'

class MainProcess {
    server!: ViteDevServer

    constructor() {
        this.startApp()
    }

    async startApp() {
        await this.runVueServer()   // 跑vue服务
        this.buildElectron()        // 编译开发环境electron
        this.runMainProcess()       // 运行主程序
    }

    async runVueServer() {
        const params: InlineConfig = {
            plugins: [vue()],
            root: path.resolve(__dirname, '../src/renderer'),
            mode: 'development',
            server: { port: 3021 }
        }
        this.server = await createServer(params)
        await this.server.listen()
    }

    buildElectron() {
        const buildOptions: BuildOptions = {
            platform: 'node',
            bundle: true,
            outfile: '../dist/main/index.js',
            entryPoints: [path.resolve('./src/main/index.ts')],
            external: ['electron', 'vue-devtools-6.0.0.7_0'],
            loader: { '.ts': 'ts', }
        }
        esbuild.build(buildOptions)
            .then(() => { })
            .catch((err) => { console.error(err) })
    }

    runMainProcess() {
        // todo 这里可以做热更新, 用 chokidar 包
        const electronExePath = path.resolve(`./node_modules/.bin/${ ELECTRON_BIN }`)
        const appDistPath = [path.resolve('../dist/main/index.js')]
        const electronProcess: ChildProcessWithoutNullStreams = spawn(electronExePath, appDistPath)

        electronProcess.on('error', (err) => {
            // todo 封装 err log
            console.log(`↓↓↓↓ electronProcess 运行期间错误捕获, 以下是捕获的错误信息 ↓↓↓↓\n`)
            console.error(err)
            console.log(`↑↑↑↑ electronProcess 错误捕获结束 ↑↑↑↑\n`)
        })

        electronProcess.on('data', () => {})

        electronProcess.on('close', () => {
            this.server
                .close()
                .then(() => {})
                .catch((err) => {console.error(err)})
            electronProcess.kill()
        })

        electronProcess.stderr.on('data', (err) => {
            console.log(`=== ===↓↓↓↓ electronProcess 命令行错误捕获器启动, 以下是捕获的错误信息↓↓↓↓=== === \n`)
            console.log(err.toString())
            console.log(`=== ===↑↑↑↑ electronProcess 错误捕获结束 ↑↑↑↑=== ===\n`)
        })
    }
}

new MainProcess()
