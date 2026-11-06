// 实心变体（fill.js）的接口和快照；逐个圆角的渲染、拟合检查在 tests/fill-*.test.js（按圆角分片并行）
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { toSvg } from '../src/export.js'
import { hasFill } from '../src/render.js'
import { filled } from './fill.js'
import { icons } from './icons.js'

describe('fill variant', () => {
  it('has icons with a fill version', () => {
    expect(filled.length).toBeGreaterThan(10)
  })

  it('falls back to the outline for icons without a fill version', () => {
    const plain = icons.find(i => !hasFill(i) && !i.animation)
    expect(toSvg(plain, { variant: 'fill' })).toBe(toSvg(plain))
  })

  it('rejects unknown variants', () => {
    expect(() => toSvg(filled[0], { variant: 'solid' })).toThrow(RangeError)
  })

  // 和 snapshot.test.js 一样：默认设置（radius 2、regular）的实心 SVG 取哈希，变化的图标按名字列出来；确认无误后 pnpm test -u
  it('default fill output matches the snapshot', async () => {
    const hash = s => createHash('sha256').update(s).digest('hex').slice(0, 16)
    const current = Object.fromEntries(filled.map(icon => [icon.name, hash(toSvg(icon, { variant: 'fill' }))]))
    const FILE = './__snapshots__/fill.json'
    const path = new URL(FILE, import.meta.url)
    let hint = ''
    if (existsSync(path)) {
      const saved = JSON.parse(readFileSync(path, 'utf8'))
      const changed = Object.keys(current).filter(n => saved[n] !== current[n])
      const removed = Object.keys(saved).filter(n => !(n in current))
      hint = [changed.length && `changed or added: ${changed.join(', ')}`, removed.length && `removed: ${removed.join(', ')}`].filter(Boolean).join('\n')
    }
    await expect(`${JSON.stringify(current, null, 2)}\n`).toMatchFileSnapshot(FILE, hint ? `run "pnpm test -u" if intended\n${hint}` : undefined)
  })
})
