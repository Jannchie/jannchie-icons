// 输出快照：每个图标在默认设置（radius 2、regular）下 toSvg 的 SVG 取哈希，存成一个 JSON（{ 名字: 哈希 }）
// 改了引擎或图标，变化的图标会在 diff 里按名字列出来；确认无误后 pnpm test -u 更新 tests/__snapshots__/icons.json
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { expect, it } from 'vitest'
import { toSvg } from '../src/export.js'
import { icons } from './icons.js'

const FILE = './__snapshots__/icons.json'
const hash = s => createHash('sha256').update(s).digest('hex').slice(0, 16)

it('default SVG output matches the snapshot', async () => {
  const current = Object.fromEntries(icons.map(icon => [icon.name, hash(toSvg(icon))]))
  // 失败时在报错里直接列出新增、变化、删除的图标名（diff 可能被截断）
  const path = new URL(FILE, import.meta.url)
  let hint = ''
  if (existsSync(path)) {
    const saved = JSON.parse(readFileSync(path, 'utf8'))
    const added = Object.keys(current).filter(n => !(n in saved))
    const removed = Object.keys(saved).filter(n => !(n in current))
    const changed = Object.keys(current).filter(n => n in saved && saved[n] !== current[n])
    const list = (label, names) => names.length ? `${label} (${names.length}): ${names.slice(0, 50).join(', ')}${names.length > 50 ? ', …' : ''}` : ''
    hint = [list('changed', changed), list('added', added), list('removed', removed)].filter(Boolean).join('\n')
  }
  await expect(`${JSON.stringify(current, null, 2)}\n`).toMatchFileSnapshot(FILE, hint ? `run "pnpm test -u" if intended\n${hint}` : undefined)
})
