const assert = require('assert')
const path = require('path')
const fs = require('fs')
const readFile = require('util').promisify(fs.readFile)

assert.strictEqual(2, 2)

const yuploader = path.resolve(__dirname, '../lib/yuploader.js')

console.log(yuploader)

async function run(filePath) {
    try {
        const fr = await await readFile(filePath, 'utf-8')
        console.log(fr)
    } catch (e) {
        console.log('err:', e)
    }
}

run(yuploader)
