import { BrowserWindow, session } from "electron";

const path =require('path')
const {app} = require('electron')
// const {app} = require('electron')
import { Win } from "./window/Win";
import { WinConfig } from "./window/WinConfig";


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


        // app.whenReady()
        //    .then(() => {
        // BrowserWindow.addDevToolsExtension('C:/Users/winnd/Desktop/electron_im/vue-devtools-6.0.0-beta.7')
        // });
        session.defaultSession.loadExtension(
            // path.join(__dirname, 'react-devtools'),
            // 'C:/Users/winnd/Desktop/electron_im/vue-devtools-6.0.0-beta.7',
            'C:/Users/winnd/AppData/Local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.7_0',
            // allowFileAccess is required to load the devtools extension on file:// URLs.
            { allowFileAccess: true }
        ).catch((err)=>{
            debugger
            console.error(err)
        })
    });
}
