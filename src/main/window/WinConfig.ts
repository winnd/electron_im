import { BrowserWindowConstructorOptions, WebPreferences } from 'electron'

export class WinConfig implements BrowserWindowConstructorOptions {
    width = 1000
    height = 600
    webpreferences: WebPreferences = {
        nodeIntegration: true,
    }
}
