// import { app, BrowserWindow, session } from 'electron'

const { app, BrowserWindow, session } = require('electron')
function createWindow() {
    const windowConfig = {
        width         : 800,
        height        : 600,
        webPreferences: {
            nodeIntegration: true,
        },
    }
    const win = new BrowserWindow(windowConfig)

    // win.loadFile(path.resolve(__dirname, 'index.html'))
    // win.loadFile('./src/renderer/index.html')
    // win.loadFile('./dist/index.html')       // 静态地址 (可用于生产打包的时候)
    win.loadURL('http://localhost:8080')       // 静态地址 (可用于生产打包的时候)
    // win.loadURL('http:www.baidu.com')       // 静态地址 (可用于生产打包的时候)
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


// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
//
// app.whenReady().then(() => {
//     // installExtension('VUEJS_DEVTOOLS')
//     //     .then((name) => console.log(`Added Extension:  ${name}`))
//     //     .catch((err) => console.log('An error occurred: ', err));
//
//     // session.defaultSession.loadExtension(
//     //     // path.join(__dirname, 'react-devtools'),
//     //     // 'C:/Users/winnd/Desktop/electron_im/vue-devtools-6.0.0-beta.7',
//     //     'C:/Users/winnd/AppData/Local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.7_0',
//     //     // allowFileAccess is required to load the devtools extension on file:// URLs.
//     //     { allowFileAccess: true }
//     // ).catch((err)=>{
//     //     debugger
//     //     console.error(err)
//     // })
// });
