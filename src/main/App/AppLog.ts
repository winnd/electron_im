import path from "path";
import {open} from "fs/promises";

type ConsoleType = 'log' | 'warn' | 'error'

enum ConsoleTypeEnum {
    log = 'log',
    warn = 'warn',
    error = 'error'
}

const LOG_FILE_PATH = path.resolve('./errLog.txt')

// todo 好像应该写成抽象类并继承
class AppLog {

    #logPath

    constructor(logPath: string) {
        this.#logPath = logPath || LOG_FILE_PATH
    }

    info(str: string) {
        const packagedObj = new PackageObj({info: str, type: ConsoleTypeEnum.log})
        this.writeToLogFile(packagedObj)
        this.print({type: 'log', packagedObj})
    }

    warning(str: string) {
        const packagedObj = new PackageObj({info: str, type: ConsoleTypeEnum.warn})
        this.writeToLogFile(packagedObj)
        this.print({type: 'warn', packagedObj})
    }

    error(err: Error) {
        const packagedObj = new PackageObj({info: err, type: 'error'})
        this.writeToLogFile(packagedObj)
        this.print({type: 'error', packagedObj})
    }

    private print({type, packagedObj}: { type: ConsoleType, packagedObj: PackageObj }): void {
        // @ts-ignore
        console[`${type}`](packagedObj.lineHeader)      // ------2021.01.01: warning  start------
        // @ts-ignore
        console[`${type}`](packagedObj.info)            // console.log(info)
        // @ts-ignore
        console[`${type}`](packagedObj.lineFooter)      // ------2021.01.01: warning  end------
    }

    private async writeToLogFile(packagedObj: PackageObj) {
        const fd = await open(this.#logPath, 'a+')
        await fd.appendFile(packagedObj.lineHeader)
        await fd.appendFile(packagedObj.info.stack)
        await fd.appendFile(packagedObj.lineFooter)
    }
}

class PackageObj {
    lineHeader: string;
    lineFooter: string;
    info: any;

    constructor({info, type}: { info: object | string, type: string }) {
        const simpleLocalTime = new Date().toLocaleString()
        this.lineHeader = `\n------${simpleLocalTime}: ${type} start------\n`
        this.lineFooter = `\n------${simpleLocalTime}: ${type} end------\n`
        this.info = info
    }
}

export const appLog = new AppLog(LOG_FILE_PATH)

function test() {
    const a = 'dd'
    try {
        JSON.parse(a);
    } catch (err) {
        appLog.warning(err)
    }
}

test()
