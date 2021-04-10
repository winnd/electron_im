import { app } from 'electron'

class Protocol {
    constructor() {
        app.setAsDefaultProtocolClient('app') // 设置自定义协议
        this.handleAppCalledByProtocol()
    }

    handleAppCalledByProtocol() {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            console.log(event) // todo event里有参数可以识别这次动作是怎么被唤起的
            // const url = event.sender.url
        })
    }
}

export const protocol = new Protocol()
