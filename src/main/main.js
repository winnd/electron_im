const {app} = require('electron')
// const {app} = require('electron')
import { Win } from "./window/Win.js";
import { WinConfig } from "./window/WinConfig.js";


lockAppInstance()
initWindow()
quitApp()

let mainWindow

function lockAppInstance() {
    const gotTheLock = app.requestSingleInstanceLock()

    if (!gotTheLock) {
        app.quit();
    } else {
        app.on('second-instance', () => {
            // todo 打开窗口 mainwindow.focus()
            // if (myWindow) {
            //     if (myWindow.isMinimized()) myWindow.restore()
            //     myWindow.focus()
            // }
        });
    }
}

function quitApp() {
    app.on('window-all-closed', () => {
        app.quit()
    });
}

function appReady() {
    app.on('ready', () => {
        const windowConfig = new WinConfig()
        mainWindow = new Win(windowConfig)
    });
}
