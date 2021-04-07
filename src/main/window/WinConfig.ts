import { BrowserWindowConstructorOptions, WebPreferences } from 'electron'

export class WinConfig implements BrowserWindowConstructorOptions {
    width = 800
    height = 600
    webpreferences: WebPreferences = {
        nodeIntegration: true,
    }
}
