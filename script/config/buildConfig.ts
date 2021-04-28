import { BuildOptions } from 'esbuild'
import path from 'path'

export const buildConfig: BuildOptions = {
    platform   : 'node',
    bundle     : true,
    outfile    : path.resolve(__dirname, '../../dist/main/index.js'),
    entryPoints: [path.resolve(__dirname, '../../src/main/index.ts')],
    external   : ['electron', 'vue-devtools-6.0.0.7_0'],
    loader     : { '.ts': 'ts' }
}
