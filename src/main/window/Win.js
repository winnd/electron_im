// import { BrowserWindow } from "electron";]
const {BrowserWindow} = import('electron')
import { WinConfig } from "./WinConfig.js";

export class Win {
    winDic = new Map()

    constructor(winConfig) {
        this.windowConfig = winConfig || new WinConfig()
    }

    _windowMaker(windowConfig) {
        const win = new BrowserWindow(windowConfig)
    }

    createWindow(windowConfig) {
        const win = new BrowserWindow(windowConfig)
    }

    getWindow(winId) {
        const win = !this.winDic.get(winId)
        if (!win) {
            const newWin = this.createWindow(windowCofig);
            return newWin
        } else {
            return win
        }
    }
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
