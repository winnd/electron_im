import {createServer, InlineConfig, defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import {ChildProcessWithoutNullStreams, exec, spawn} from "child_process";


class MainProcess {
    constructor() {
        this.runVueServer()
        this.buildElectron()
        this.runMainProcess()
    }

    async runVueServer() {
        const params: InlineConfig = {
            plugins: [vue()],
            root: path.resolve(__dirname, '../src/renderer'),
            mode: 'development',
            server: {
                port: 3021
            },
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
        // exec('npm run vite_dev', (err, stdout, stderr) => {
        //     if (err) {
        //         console.error(err)
        //     }
        //     console.log({err, stdout, stderr});
        // });

    }

    runMainProcess() {
        const a: ChildProcessWithoutNullStreams = spawn('')
    }
}

// export const newInstance = new MainProcess()
new MainProcess()
