import { app, BrowserWindow, session, crashReporter, CrashReporterStartOptions, WebContents, RenderProcessGoneDetails } from 'electron'
import * as path from 'path'
import { Win } from './window/Win'
import { Pool } from './window/Pool'

// app.commandLine.appendSwitch('--disable-site-isolation-trials')  // todo 这个在跨域时要打开

class AppEntry {
    constructor() {

        this.handleErrorAndCrash()  // 注册崩溃及错误报告
        this.winHandle()            // 注册窗口事件
        // this.login().then(() => {            // todo 在登录完成后挂载全局对象
        //     (globalThis as any).app = app
        // })

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
    private handleErrorAndCrash() {
        catchElectronCrash()        // electron 抓到的崩溃报告 生成 .dmp文件
        catchNodeProcessCrash()     // process 抓到的崩溃报告
        catchAppCrash()             // {app} 抓到的崩溃报告

        /**
         * electron 抓到的崩溃报告 生成 .dmp文件
         */
        function catchElectronCrash() {
            const crashDumpsDir = app.getPath('crashDumps')
            const crashConfig: CrashReporterStartOptions = {
                submitURL: crashDumpsDir,
                uploadToServer: false
            }
            crashReporter.start(crashConfig) // todo 这里以后要搭建 Sentry.io 崩溃报告分析服务器, 要不然本地的崩溃报告看不懂
        }

        /**
         * process 抓到的崩溃报告
         */
        function catchNodeProcessCrash() {
            // todo 要封装一个错误对象 new CommonError({title, err, oterInfo})
            process.on('unhandledRejection', (reason, promise: Promise<any>) => {
                console.log({ promise, info: 'todo 要打出来才知道这里是啥' })
                _writeErrorToFile({ title: 'uncaughtException', err: new Error('reason') })
            })
            process.on('uncaughtException', (err: Error, origin: any) => {
                console.log({ origin, info: 'todo origin好像是node15的新特性' })
                _writeErrorToFile({ title: 'uncaughtException', err })
            })
        }

        function catchAppCrash() {
            app.on('render-process-gone', (e: Event, wc: WebContents, details: RenderProcessGoneDetails) => {
                console.log(e, wc, details)
                // todo 通用err类
                const errInfo = {
                    url: wc.getURL(),
                    ...details
                }
                _writeErrorToFile({ title: '渲染进程崩溃', err: new Error(JSON.stringify(errInfo)) })
            })
            app.on('child-process-gone', (e, details) => {
                console.log(e, details)
                const errInfo = {
                    ...details
                }
                _writeErrorToFile({ title: '渲染进程崩溃', err: new Error(JSON.stringify(errInfo)) })
            })
        }

        function _writeErrorToFile({ title, err }: { title: string, err: Error }) {
            // todo 这里要封装error组件, 继承于原生js的Error, 现在先暂时这么用
            console.log(title, err)
        }
    }

    initMainWin() {
        const mainWin = new Win({ name: 'main' })
        mainWin.loadURL('http://localhost:3021/')       // 静态地址 (可用于生产打包的时候)
        mainWin.mOpenDevTools()
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
