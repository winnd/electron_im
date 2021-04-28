import { createServer, InlineConfig, ViteDevServer } from 'vite'
import * as path from 'path'
import * as esbuild from 'esbuild'
import { BuildOptions } from 'esbuild'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'

const { viteConfig } = require('./config/viteConfig')   // ts-node 的import不起效
const { buildConfig } = require('./config/buildConfig')

const ELECTRON_BIN = process.platform === 'win32' ? 'electron.cmd' : 'electron'

class MainProcess {
    viteServer!: ViteDevServer

    constructor() {
        this.startApp()
    }

    async startApp() {
        await this.runVueServer(viteConfig)    // 跑vue服务
        this.buildElectron(buildConfig)        // 编译开发环境electron
        this.runMainProcess()                  // 运行主程序
    }

    async runVueServer(viteConfig: InlineConfig) {
        this.viteServer = await createServer(viteConfig)
        await this.viteServer.listen()
    }

    buildElectron(buildConfig: BuildOptions) {
        esbuild.build(buildConfig)
               .then(() => { })
               .catch((err) => { console.error(err)})
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

        electronProcess.on('data', () => { })

        electronProcess.on('close', () => {
            this.viteServer
                .close()
                .then(() => { })
                .catch((err) => { console.error(err) })
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
