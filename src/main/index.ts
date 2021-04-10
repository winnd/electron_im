import { app, BrowserWindow, session, crashReporter, CrashReporterStartOptions } from 'electron'
import * as path from 'path'
import { Win } from './window/Win'
import { Pool } from './window/Pool'

// app.commandLine.appendSwitch('--disable-site-isolation-trials')  // todo 这个在跨域时要打开

class AppEntry {
    constructor() {
        // 注册崩溃及错误报告
        this.catchCrash()

        // 启动实例
        const getInstanceLock = app.requestSingleInstanceLock()
        if (!getInstanceLock) {
            app.quit()
        } else {
            app.whenReady().then(() => {
                this.initMainWin()
                this.addVueDevToolsExtension()
            })
            app.on('second-instance', () => {
                // todo 测试多应用实例运行的情况
                // todo 可以处理从协议拉起来的情况, 并获取url进行其他处理
                const mainWindow = Pool.winDic.get('main')
                if (mainWindow) {
                    if (mainWindow.isMinimized()) mainWindow.restore()
                    mainWindow.focus()
                }
            })
        }
    }

    // 崩溃处理
    private catchCrash() {
        const crashDumpsDir = app.getPath('crashDumps')
        console.log('1111')
        console.log({ crashDumpsDir })
        const crashConfig: CrashReporterStartOptions = {
            submitURL: crashDumpsDir,
            uploadToServer: false
        }
        crashReporter.start(crashConfig)
        process.crash()
    }

    initMainWin() {
        const mainWin = new Win({ name: 'main' })
        mainWin.loadURL('http://localhost:3021/')       // 静态地址 (可用于生产打包的时候)
        mainWin.webContents.openDevTools()
    }

    winHandle() {
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit()
            }
        })

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.initMainWin()
            }
        })
    }

    addVueDevToolsExtension() {
        session.defaultSession.loadExtension(
            // 'C:/Users/winnd/AppData/Local/Google/Chrome/User Data/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg/6.0.0.7_0',
            path.resolve('./vue-devtools-6.0.0.7_0'),
            { allowFileAccess: true }
        ).catch((err) => {
            console.error(err)
        })
    }
}

export const appEntry = new AppEntry()
