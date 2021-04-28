import { Win } from './Win'
import { WinConfig } from './WinConfig.js'

export class LoginWin extends Win {
    constructor({ winConfig }?: { winConfig?: WinConfig }) {
        super({ name: 'login', winConfig })
    }
}


