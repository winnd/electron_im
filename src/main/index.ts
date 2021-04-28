import { App, app, BrowserWindow, crashReporter, CrashReporterStartOptions, RenderProcessGoneDetails, session, WebContents } from 'electron'
import * as path from 'path'
import { Win } from './window/Win'
import { Pool } from './window/Pool'
import { LoginWin } from 'src/main/window/LoginWin'

// app.commandLine.appendSwitch('--disable-site-isolation-trials')  // todo 这个在生产处理跨域时要打开 要根据环境变量进行判断

export class AppEntry {
    private static application: App = app                 // todo 应用的唯一实例, 以后应该要把private拿掉的

    static async start() {
        AppEntry.registerErrorHandle()              // 注册崩溃及错误报告
        AppEntry.appHandle()                        // 应用级事件注册
        AppEntry.runApp()                           // 运行程序
    }

    //#region handleErrorAndCrash 崩溃处理 todo 未完成
    /**
     * 注册崩溃及错误报告
     */
    static registerErrorHandle() {
        catchElectronCrash()        // electron 抓到的崩溃报告 生成 .dmp文件
        catchNodeProcessCrash()     // process 抓到的崩溃报告
        catchAppCrash()             // {app} 抓到的崩溃报告

        /**
         * electron 抓到的崩溃报告 生成 .dmp文件
         */
        function catchElectronCrash() {
            const crashDumpsDir = app.getPath('crashDumps')
            const crashConfig: CrashReporterStartOptions = {
                submitURL     : crashDumpsDir,
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

    //#endregion

    //#region winHandle 应用级事件注册
    static appHandle() {
        AppEntry.application.on('window-all-closed', _onWindowAllClosed)
        AppEntry.application.on('activate', _onActivate)
        AppEntry.application.on('second-instance', _handleSecondInstance)

        function _onWindowAllClosed() {
            if (process.platform !== 'darwin') {
                AppEntry.application.quit()
            }
        }

        function _onActivate() {
            if (BrowserWindow.getAllWindows().length === 0) {
                AppEntry.initMainWindow()
            }
        }

        function _handleSecondInstance(event, commandLine, workingDirectory) {
            // todo 测试多应用实例运行的情况
            // todo 可以处理从协议拉起来的情况, 并获取url进行其他处理
            // todo event里有参数可以识别这次动作是怎么被唤起的
            // const url = event.sender.url
            const mainWindow = Pool.winDic.get('main')
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore()
                mainWindow.focus()
            }
        }
    }

    //#endregion

    //#region runApp 运行程序
    static async runApp() {
        const getInstanceLock = AppEntry.application.requestSingleInstanceLock()
        getInstanceLock ? _startApp() : _quitApp()

        /**
         * 启动
         * @private
         */
        async function _startApp() {
            await AppEntry.application.whenReady()
            await AppEntry.initMainWindow()
            await _addVueDevToolsExtension()
        }

        /**
         * 添加vue的控制台调试工具
         * todo 要根据环境变量判断环境, 生产环境上要拿掉
         * @private
         */
        function _addVueDevToolsExtension() {
            session.defaultSession
                   .loadExtension(path.resolve('./tools/vue-devtools-6.0.0.7_0'), { allowFileAccess: true })
                   .catch((err) => { console.error(err)})
        }

        /**
         * 退出程序
         * @private
         */
        function _quitApp() {
            AppEntry.application.quit()
        }
    }

    //#endregion

    /**
     * 程序入口
     * @private
     */
    private static initMainWindow() {
        // todo 根据环境变量区别loadUrl
        const mainWin = new Win({ name: 'main' })
        const loginWin = new LoginWin()
        loginWin.loadURL('http://localhost:3021/')
        mainWin.loadURL('http://localhost:3021/')       // 静态地址 (可用于生产打包的时候)
        // mainWin.loadFile('./dist/index.html')       // 静态地址 (可用于生产打包的时候, 或者使用网络上部署的版本)
        mainWin.mOpenDevTools()
    }
}

AppEntry.start()
