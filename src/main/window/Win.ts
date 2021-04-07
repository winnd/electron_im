// import { BrowserWindow } from "electron";]
import { BrowserWindow } from 'electron'
import { WinConfig } from './WinConfig.js'
import { pool, Pool } from './Pool'

export class Win extends BrowserWindow {
    constructor({ name, winConfig = new WinConfig() }: { name: string, winConfig?: WinConfig }) {
        super(winConfig)
        if (!Pool.winDic.get(name)) {
            Pool.winDic.set(name, this)
        } else {
            const errInfo = `名字为${ name }的窗口已创建过, 请检查新窗口的名字`
            throw new Error(errInfo)
        }
    }

    _windowMaker(windowConfig: WinConfig) {
        const win = new BrowserWindow(windowConfig)
    }

    // createWindow(windowConfig: WinConfig) {
    //     const win = new BrowserWindow(windowConfig)
    //     this.winDic.set()
    // }

    // getWindow(winId) {
    //     const win = !this.winDic.get(winId)
    //     if (!win) {
    //         const newWin = this.createWindow(windowCofig)
    //         return newWin
    //     } else {
    //         return win
    //     }
    // }
}

// function createWindow() {
//     const windowConfig = {
//         width         : 800,
//         height        : 600,
//         webpreferences: {
//             nodeIntegration: true,
//         },
//     }
//     const win = new BrowserWindow(windowConfig)
//
//     // win.loadFile(path.resolve(__dirname, 'index.html'))
//     // win.loadFile('./src/renderer/index.html')
//     win.loadFile('./dist/index.html')       // 静态地址 (可用于生产打包的时候)
// }
