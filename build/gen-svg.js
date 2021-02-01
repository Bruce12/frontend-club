const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, '../src/icons/svg/')
const files = fs.readdirSync(filePath)
const output = path.resolve(__dirname, '../src/icons/modules.ts')
// 拼接: 规则 文件民驼峰命名法去拼接，只处理 [-|_] ，其他标识符不做处理，.开头的文件忽略
if (!files.length) {
  process.stdout.write('无可读取的文件...')
  process.exit(-1)
}
let temp = ''
function toHump(name) {
  return name.replace(/[-|_](\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}
files.forEach((file) => {
  if (/^[^.][\w|-]+(\.svg)$/.test(file)) {
    // 获取文件名字
    const p = path.parse(`${filePath}/${file}`)
    const keyName = toHump(p.name)
    temp += `  ${keyName}: () => require('./svg/${file}'),
`
  }
})
if (!temp) return
temp = temp.substr(0, temp.length - 2)
const codeStr = `const MAP = {
${temp}
}
export default MAP
`
fs.writeFileSync(output, codeStr)
// 读取 modules.ts 文件，将拼接好的map 写入到 这个文件中
process.stdout.write('done!')
