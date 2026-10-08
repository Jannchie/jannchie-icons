// 命名校验：文件名 kebab-case（只用 a-z、0-9、-）、不重复（含大小写不敏感、核心包导出名），每个图标都归进了非「未分类」的分类
import { describe, expect, it } from 'vitest'
import { categorize } from '../src/categories.js'
import { files, icons } from './icons.js'

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// 核心包的导出名（同 scripts/build-packages.mjs）：Icon + PascalCase
const exportName = name => `Icon${name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('')}`
const duplicates = list => [...new Set(list.filter((x, i) => list.indexOf(x) !== i))]

describe('icon names', () => {
  const names = files.filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))

  it('every icon module is loaded', () => {
    expect(icons.map(i => i.name).sort()).toEqual([...names].sort())
  })

  it('are kebab-case with [a-z0-9-] only', () => {
    expect(names.filter(n => !KEBAB.test(n))).toEqual([])
  })

  it('are unique, also ignoring case and as package export names', () => {
    expect(duplicates(names.map(n => n.toLowerCase()))).toEqual([])
    expect(duplicates(names.map(exportName))).toEqual([])
  })

  it('every icon exports a draw function', () => {
    const bad = icons.filter(i => typeof i.draw !== 'function' || (i.animation && typeof i.animation.draw !== 'function'))
    expect(bad.map(i => i.name)).toEqual([])
  })
})

// 改名后保留的旧名（src/aliases.js，可能不存在）：旧名不需要有对应文件，但要是合法的名字，指向的新名必须是现有图标
const aliasModules = import.meta.glob('../src/aliases.js', { eager: true })
const aliasPairs = Object.values(aliasModules).flatMap(mod => Object.values(mod))
  .filter(v => v && typeof v === 'object' && !Array.isArray(v))
  .flatMap(obj => Object.entries(obj).filter(([, to]) => typeof to === 'string'))

describe.skipIf(!aliasPairs.length)('aliases', () => {
  const names = new Set(icons.map(i => i.name))
  it('old names are kebab-case and point to existing icons', () => {
    expect(aliasPairs.filter(([from]) => !KEBAB.test(from)).map(([from]) => from)).toEqual([])
    expect(aliasPairs.filter(([, to]) => !names.has(to)).map(([from, to]) => `${from} → ${to}`)).toEqual([])
  })
})

describe('categories', () => {
  const cats = categorize(icons)

  it('every icon lands in a real category, none in "other" (uncategorized)', () => {
    const other = cats.find(c => c.id === 'other')
    expect(other?.groups.flatMap(g => g.icons.map(i => i.name)) ?? []).toEqual([])
  })

  it('every icon is placed exactly once', () => {
    const placed = cats.flatMap(c => c.groups.flatMap(g => g.icons.map(i => i.name)))
    expect(duplicates(placed)).toEqual([])
    expect(placed.length).toBe(icons.length)
  })
})
