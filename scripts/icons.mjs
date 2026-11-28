// 全部图标（Node 环境：构建、审计、品牌素材等脚本）；组装和排序见 src/icon-list.js，Vite 环境用 src/iconset.js
// 要用 node --import ./scripts/node-ext.mjs 运行（src/ 里的相对导入省略了 .js 后缀）
import { readdirSync } from 'node:fs'
import { compareNames, iconsFrom } from '../src/icon-list.js'

const DIR = new URL('../src/icons/', import.meta.url)

// 图标名，按 compareNames 排序；给了前缀时只留以其中某个前缀开头的。
// 前缀一个都没匹配上就报错：审计门禁按 0 个图标跑完会以 0 退出，把写错的参数（比如旧写法 --baseline 文件名）静默放过
export function iconNames(prefixes = []) {
  const names = readdirSync(DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => f.slice(0, -3))
    .filter(n => !prefixes.length || prefixes.some(p => n.startsWith(p)))
    .sort(compareNames)
  if (prefixes.length && !names.length)
    throw new Error(`no icon name starts with ${prefixes.map(p => JSON.stringify(p)).join(' or ')}`)
  return names
}

// 加载图标：{ icons（按名字排序）, byName }；names 默认是全部
export async function loadIcons(names = iconNames()) {
  const mods = await Promise.all(names.map(n => import(new URL(`${n}.js`, DIR).href)))
  return iconsFrom(names.map((n, i) => [n, mods[i]]))
}
