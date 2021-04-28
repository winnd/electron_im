// import { BrowserWindow } from 'electron'


import { app, App, BrowserWindow } from 'electron'

export default class Main {
    static mainWindow: BrowserWindow | null
    static application: App
    static BrowserWindow: typeof BrowserWindow

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit()
        }
    }

    private static onClose() {
        Main.mainWindow = null
    }

    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({ width: 800, height: 600 })
        Main.mainWindow.loadURL(`file://${ __dirname }/index.html`)
        Main.mainWindow.on('closed', Main.onClose)
    }

    static main(app: App, browserWindow: typeof BrowserWindow) {
        Main.BrowserWindow = browserWindow
        Main.application = app
        Main.application.on('window-all-closed', Main.onWindowAllClosed)
        Main.application.on('ready', Main.onReady)
    }
}

// run
Main.main(app, BrowserWindow)
