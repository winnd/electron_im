// import { BrowserWindow } from "electron";]
import { BrowserWindow, BrowserView } from 'electron'
import { WinConfig } from './WinConfig.js'
import { Pool } from './Pool'

export class Win extends BrowserWindow {
    /**
     * 自定义窗口, 继承于BrowserWindow
     * @param name       窗口标识, todo 后期可扩展用于窗口title
     * @param winConfig  自定义配置文件, 继承于BrowserWindowConstructorOptions
     */
    constructor({ name, winConfig = new WinConfig() }: { name: string, winConfig?: WinConfig }) {
        super(winConfig)
        if (!Pool.winDic.get(name)) {
            this.registerWinEvent()
            Pool.winDic.set(name, this)
        } else {
            const errInfo = `名字为${ name }的窗口已创建过, 请检查新窗口的名字`
            throw new Error(errInfo)
        }
    }

    registerWinEvent() {
        // todo 注册一些窗口监听事件
    }

    // todo ↓↓↓↓↓ 以下是需要根据业务重写的方法
    minimize() {
        super.minimize()
    }

    maximize() {
        super.maximize()
    }

    flashFrame(flag: boolean) {
        super.flashFrame(flag)
    }

    setTopBrowserView(browserView: BrowserView) {
        super.setTopBrowserView(browserView)
    }

    close() {
        super.close()
    }

    mOpenDevTools() {
        this.webContents.openDevTools()
    }

    mCloseDevTools() {
        this.webContents.closeDevTools()
    }


    // _windowMaker(windowConfig: WinConfig) {
    //     const win = new BrowserWindow(windowConfig)
    // }


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
