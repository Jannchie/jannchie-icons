// 别名表（src/aliases.js）校验：现名都存在、旧名不再有文件、没有链式 / 循环别名、导出名不和现有图标撞
import { describe, expect, it } from 'vitest'
import { ALIASES, oldNamesOf, resolveName } from '../src/aliases.js'
import { files } from './icons.js'

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const exportName = name => `Icon${name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('')}`

describe('aliases', () => {
  const names = new Set(files.filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)))
  const entries = Object.entries(ALIASES)

  it('point to existing icons', () => {
    expect(entries.filter(([, name]) => !names.has(name))).toEqual([])
  })

  it('old names no longer have icon files', () => {
    expect(entries.filter(([old]) => names.has(old)).map(([old]) => old)).toEqual([])
  })

  it('are not chained or circular', () => {
    expect(entries.filter(([old, name]) => old === name || name in ALIASES)).toEqual([])
  })

  it('old names are kebab-case and their export names do not clash with icons', () => {
    expect(entries.filter(([old]) => !KEBAB.test(old)).map(([old]) => old)).toEqual([])
    const exportNames = new Set([...names].map(exportName))
    expect(entries.filter(([old]) => exportNames.has(exportName(old))).map(([old]) => old)).toEqual([])
  })

  it('resolve both ways', () => {
    for (const [old, name] of entries) {
      expect(resolveName(old)).toBe(name)
      expect(oldNamesOf(name)).toContain(old)
    }
    expect(resolveName('heart')).toBe('heart')
  })
})
