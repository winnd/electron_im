import {createServer, InlineConfig, defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import * as esbuild from "esbuild";
import {ChildProcessWithoutNullStreams, exec, spawn} from "child_process";
import {BuildOptions, ServeOptions} from "esbuild";

const ELECTRON_BIN = process.platform === 'win32' ? 'electron.cmd' : 'electron'

class MainProcess {
    constructor() {
        this.runVueServer().then(() => {
            this.buildElectron()
            this.runMainProcess()
        });
    }

    async runVueServer() {
        const params: InlineConfig = {
            plugins: [vue()],
            root: path.resolve(__dirname, '../src/renderer'),
            mode: 'development',
            server: {port: 3021},
            resolve: {
                alias: [
                    {find: 'src', replacement: '../'}
                ]
            }
        }
        const server = await createServer(params)
        await server.listen()
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
            .then((build) => { console.log('11') })
            .catch((err) => { console.error(err)  });
    }

    runMainProcess() {
        const electronExePath = path.resolve(`./node_modules/.bin/${ELECTRON_BIN}`)
        const appDistPath = [path.resolve('../dist/main/index.js')]
        const electronProcess: ChildProcessWithoutNullStreams = spawn(electronExePath, appDistPath);
        electronProcess.on('error', (err) => {
            // todo 封装 err log
            console.error(err)
        });
        electronProcess.stderr.on('data', (err) => {
            console.log(`----111 start----\n`)
            const aa = err.toString()           // todo 这里的错误显示不出来, 大概要写入文件才行
            console.log(err.toString())
            console.log('33')
            console.log(`----111 end----\n`)
        })
    }
}

// export const newInstance = new MainProcess()
new MainProcess()
