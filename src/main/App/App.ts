import { ipcMain } from 'electron'
import { appLog } from './AppLog'
import { protocol } from './Protocol'
import { tray } from './Tray'
import { shortCut } from './ShortCut'

class App {
    log = appLog
    tray = tray
    protocol = protocol
    shortCut = shortCut

    constructor() {
        this.registerIpcMainEvent()
    }

    /**
     * 注册事件监听事件
     */
    registerIpcMainEvent() {
        ipcMain.handle('evName', (event, ...args) => {

        })
    }
}

export const app = new App()
