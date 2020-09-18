import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'

const { dependencies = {}, peerDependencies = {} } = require('./package.json')

export default {
    input: 'src/index.ts',
    output: {
        name: 'just',
        format: 'cjs',
        file: `dist/cli.js`,
    },
    plugins: [
        typescript(),
        commonjs(),
        nodeResolve(),
    ],
    external: [
        ...Object.keys(dependencies),
        ...Object.keys(peerDependencies),
        'path',
        'util',
        'child_process',
    ],
}
