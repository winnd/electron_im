import { BrowserWindow, BrowserWindowConstructorOptions, WebPreferences } from 'electron'

export class WinConfig implements BrowserWindowConstructorOptions {
    width = 1000
    height = 600
    // nativeWindowOpen todo 可能不需要
    parent?: BrowserWindow
    // thickFrame // todo 可能不需要
    center: boolean = true
    webpreferences: WebPreferences = {
        nodeIntegration                  : true,
        nodeIntegrationInSubFrames       : true,
        nodeIntegrationInWorker          : true,
        worldSafeExecuteJavaScript       : true, // todo 可能不需要
        contextIsolation                 : false, // todo 可能不需要
        webSecurity                      : false, // 同源策略
        disableHtmlFullscreenWindowResize: false, // todo 可能不需要
        enableWebSQL                     : true,
    }
}
