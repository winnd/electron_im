import { app } from 'electron'

/**
 * 快捷键
 */
class ShortCut {
    constructor() {
    }

    init() {
        app.on('browser-window-focus', () => {
            this.registerShortCut()
        })
        app.on('browser-window-blur', () => {
            this.unRegisterShortCut()
        })
    }

    registerShortCut() {
    }

    unRegisterShortCut() {

    }

}

export const shortCut = new ShortCut()
