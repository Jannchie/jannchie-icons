// 测试共用：按核心包的方式组装图标（{ name, draw, animation }，见 scripts/build-packages.mjs），只用公开入口
import { readdirSync } from 'node:fs'

const modules = import.meta.glob('../src/icons/*.js', { eager: true })

export const icons = Object.entries(modules)
  .map(([path, mod]) => {
    const name = path.split('/').pop().slice(0, -3)
    return mod.animation ? { name, draw: mod.default, animation: mod.animation } : { name, draw: mod.default }
  })
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

// 磁盘上的文件名（含非 .js 文件，命名校验用）
export const files = readdirSync(new URL('../src/icons/', import.meta.url))

// 合法 SVG path 数据：按 SVG 规范逐个命令解析，检查参数个数、数字格式和弧线标志位（紧排的 "011" 也认）
const ARGS = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 }
const NUM = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i
export function checkPathData(d) {
  if (typeof d !== 'string' || !d.trim())
    return 'empty path data'
  if (/nan|infinity|undefined|null/i.test(d))
    return `contains NaN / Infinity / undefined: ${d.slice(0, 80)}`
  let i = 0
  const skip = () => {
    while (i < d.length && /[\s,]/.test(d[i])) i++
  }
  const number = () => {
    skip()
    const m = NUM.exec(d.slice(i))
    if (!m)
      return null
    i += m[0].length
    return Number(m[0])
  }
  const flag = () => {
    skip()
    if (d[i] === '0' || d[i] === '1')
      return Number(d[i++])
    return null
  }
  skip()
  if (!/[m]/i.test(d[i]))
    return `must start with a moveto: ${d.slice(0, 40)}`
  while (i < d.length) {
    skip()
    if (i >= d.length)
      break
    const cmd = d[i]
    const n = ARGS[cmd.toLowerCase()]
    if (n === undefined)
      return `unexpected "${cmd}" at ${i}: ${d.slice(Math.max(0, i - 20), i + 20)}`
    i++
    if (n === 0)
      continue
    // 一个命令后面可以跟多组参数
    let groups = 0
    for (;;) {
      skip()
      if (i >= d.length || /[a-z]/i.test(d[i]))
        break
      for (let k = 0; k < n; k++) {
        const v = cmd.toLowerCase() === 'a' && (k === 3 || k === 4) ? flag() : number()
        if (v === null || !Number.isFinite(v))
          return `bad argument ${k + 1} of "${cmd}" at ${i}: ${d.slice(Math.max(0, i - 20), i + 20)}`
      }
      groups++
    }
    if (!groups)
      return `"${cmd}" without arguments at ${i}`
  }
  return null
}
