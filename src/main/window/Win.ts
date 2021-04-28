// import { BrowserWindow } from "electron";]
import { BrowserView, BrowserWindow } from 'electron'
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
        const win = Pool.winDic.get(name)
        if (!win) {
            this.handleWindowEvent()
            Pool.winDic.set(name, this)
        } else {
            const errInfo = `名字为${ name }的窗口已创建过, 请重新分配一个窗口的名字`
            throw new Error(errInfo)
        }
    }

    handleWindowEvent() {
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
}
