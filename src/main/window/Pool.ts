import { Win } from './Win'

export class Pool {
    // static winDic: new Map<string, Win>
    static winDic: Map<string, Win> = new Map<string, Win>()
}

export const pool = new Pool()
