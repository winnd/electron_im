import { test2 } from 'renderer/components/test2'

export const test1 = ({ arg1 = 'aa' }: { arg1: string }) => {
    console.log('111')
    const a = 1
    console.log(arg1)
    console.log(test2)
}
