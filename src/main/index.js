import { app, BrowserWindow } from 'electron'

function createWindow () {
    const windowConfig = {
        width:          800,
        height:         600,
        webpreferences: {
            nodeIntegration: true,
        },
    }
    const win = new BrowserWindow(windowConfig)

    // win.loadFile(path.resolve(__dirname, 'index.html'))
    win.loadFile('./src/renderer/index.html')
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
