import fs from 'fs'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
// 清理文件
import clear from 'rollup-plugin-clear'
import banner from 'rollup-plugin-banner'
// 压缩js
import { uglify } from 'rollup-plugin-uglify'
// css
import scss from 'rollup-plugin-scss'
import postcss from 'postcss'
import CleanCss from 'clean-css'
import autoprefixer from 'autoprefixer'
// 服务
import serve from 'rollup-plugin-serve'
// 热加载
import livereload from 'rollup-plugin-livereload'
import html2 from 'rollup-plugin-html2'

import pk from './package.json'

// ------ 自定义 start -----
// 端口
const PORT = 8000
// 输出目录
const DIR = 'lib'
// js生成的格式
const FORMATS = ['esm', 'amd', 'umd']
// banner
const BANNER = `
@name: ${pk.name}
@description: ${pk.description}
@repository: ${pk.repository}
@author: ${pk.author}
@version: ${pk.version}
@time: ${new Date().toLocaleString()}
`

// ------ 自定义 end -----

const fdir = path.join(__dirname, DIR)
const fpath = path.join(__dirname, DIR, pk.name)

const outputs = []
if (process.env.NODE_ENV === 'production') {
    for (let format of FORMATS) {
        outputs.push({
            file: `${fpath}.${format}.min.js`,
            format: format,
            name: pk.name,
            plugins: [
                uglify({
                    compress: {
                        drop_console: process.env.NODE_ENV === 'production'
                    }
                })
            ]
        })
    }
}

const plugins = []
if (process.env.NODE_ENV === 'development') {
    plugins.push(
        ...[
            serve({
                open: false,
                port: PORT,
                openPage: '',
                contentBase: fdir,
                verbose: true
            }),
            livereload(),
            html2({
                template: './index.html',
                externals: [{ type: 'css', file: `${pk.name}.css`, pos: 'before' }]
            })
        ]
    )
}

export default [
    {
        input: 'src/main.js',
        output: [
            {
                file: `${fpath}.js`,
                format: 'cjs'
            },
            {
                file: `${fpath}.min.js`,
                format: 'cjs',
                plugins: [
                    uglify({
                        compress: {
                            drop_console: true
                        }
                    })
                ]
            },
            ...outputs
        ],
        plugins: [
            json(),
            resolve(),
            commonjs(),
            banner(BANNER),
            babel({
                babelHelpers: 'bundled'
            }),
            clear({
                targets: [fdir],
                watch: true
            }),
            scss({
                output: function (styles, styleNodes) {
                    if (fs.existsSync(fdir)) {
                        postcss([autoprefixer])
                            .process(styles)
                            .then(result => {
                                result.warnings().forEach(warn => {
                                    console.warn(warn.toString())
                                })
                                const css = banner(BANNER).renderChunk(result.css)
                                fs.writeFileSync(`${fpath}.css`, css)
                                if (process.env.NODE_ENV === 'production') {
                                    const compressed = new CleanCss().minify(css).styles
                                    const compressedCss = banner(BANNER).renderChunk(compressed)
                                    fs.writeFileSync(`${fpath}.min.css`, compressedCss)
                                }
                            })
                    }
                }
            }),
            ...plugins
        ]
    }
]
