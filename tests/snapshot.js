// 输出快照（tests/__snapshots__/<file>）：每个图标一段 SVG 取哈希，存成一个 JSON（{ 名字: 哈希 }）
// 改了引擎或图标，变化的图标在报错里按名字列出来（diff 可能被截断）；确认无误后 pnpm test -u 更新。
// scripts/history.mjs 读的也是这两份快照（发版说明的「重画」、updated.json），格式不要随便改
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { expect } from 'vitest'

const hash = s => createHash('sha256').update(s).digest('hex').slice(0, 16)

// file：__snapshots__ 下的文件名；svgOf：图标 → SVG 字符串
export async function expectSnapshot(file, icons, svgOf) {
  const current = Object.fromEntries(icons.map(icon => [icon.name, hash(svgOf(icon))]))
  const rel = `./__snapshots__/${file}`
  const path = new URL(rel, import.meta.url)
  let hint = ''
  if (existsSync(path)) {
    const saved = JSON.parse(readFileSync(path, 'utf8'))
    const added = Object.keys(current).filter(n => !(n in saved))
    const removed = Object.keys(saved).filter(n => !(n in current))
    const changed = Object.keys(current).filter(n => n in saved && saved[n] !== current[n])
    const list = (label, names) => names.length ? `${label} (${names.length}): ${names.slice(0, 50).join(', ')}${names.length > 50 ? ', …' : ''}` : ''
    hint = [list('changed', changed), list('added', added), list('removed', removed)].filter(Boolean).join('\n')
  }
  await expect(`${JSON.stringify(current, null, 2)}\n`).toMatchFileSnapshot(rel, hint ? `run "pnpm test -u" if intended\n${hint}` : undefined)
}
