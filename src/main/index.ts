import {app, BrowserWindow, session} from 'electron'
// import {path} from 'node:path';
import * as path from 'path'

function createWindow() {
    const windowConfig = {
        width: 800,
        height: 600,
        webpreferences: {
            nodeIntegration: true,
        },
    }
    const win = new BrowserWindow(windowConfig)
    win.loadURL('http://localhost:3021/')       // 静态地址 (可用于生产打包的时候)
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


app.whenReady().then(() => {
    session.defaultSession.loadExtension(
        // 'C:/Users/winnd/AppData/Local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/vue-devtools-6.0.0.7_0',
        path.resolve(__dirname, '../vue-devtools-6.0.0.7_0'),
        {allowFileAccess: true}
    ).catch((err) => {
        debugger
        console.error(err)
    })
})
// C:\Users\winnd\Desktop\electron_im\vue-devtools-6.0.0.7_0
