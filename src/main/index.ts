import { app, BrowserWindow, session } from 'electron'
import * as path from 'path'
import { Win } from './window/Win'

app.commandLine.appendSwitch('--disable-site-isolation-trials')

function initMainWin() {
    const mainWin = new Win({ name: 'main' })
    mainWin.loadURL('http://localhost:3021/')       // 静态地址 (可用于生产打包的时候)
    mainWin.webContents.openDevTools()
}


function winHandle() {
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            initMainWin()
        }
    })
}

const getInstanceLock = app.requestSingleInstanceLock()
console.log(getInstanceLock)
if (!getInstanceLock) {
    app.quit()
} else {
    app.whenReady().then(() => {
        initMainWin()
        addVueDevToolsExtension()
    })
}

function addVueDevToolsExtension() {
    session.defaultSession.loadExtension(
        // 'C:/Users/winnd/AppData/Local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/vue-devtools-6.0.0.7_0',
        path.resolve('./vue-devtools-6.0.0.7_0'),
        { allowFileAccess: true }
    ).catch((err) => {
        console.error(err)
    })
}

