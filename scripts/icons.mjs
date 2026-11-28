// 全部图标（Node 环境：构建、审计、品牌素材等脚本）；组装和排序见 src/icon-list.js，Vite 环境用 src/iconset.js
// 要用 node --import ./scripts/node-ext.mjs 运行（src/ 里的相对导入省略了 .js 后缀）
import { readdirSync } from 'node:fs'
import { compareNames, iconsFrom } from '../src/icon-list.js'

const DIR = new URL('../src/icons/', import.meta.url)

// 图标名，按 compareNames 排序；给了前缀时只留以其中某个前缀开头的
export function iconNames(prefixes = []) {
  return readdirSync(DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => f.slice(0, -3))
    .filter(n => !prefixes.length || prefixes.some(p => n.startsWith(p)))
    .sort(compareNames)
}

// 加载图标：{ icons（按名字排序）, byName }；names 默认是全部
export async function loadIcons(names = iconNames()) {
  const mods = await Promise.all(names.map(n => import(new URL(`${n}.js`, DIR).href)))
  return iconsFrom(names.map((n, i) => [n, mods[i]]))
}
