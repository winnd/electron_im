import { app } from 'electron'

/**
 * 自定义协议
 */
class Protocol {
    constructor() {
        app.setAsDefaultProtocolClient('app') // 设置自定义协议
    }
}

export const protocol = new Protocol()
