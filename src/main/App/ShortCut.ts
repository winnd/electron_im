import { app } from 'electron'

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
