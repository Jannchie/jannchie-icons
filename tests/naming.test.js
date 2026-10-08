// 命名校验：文件名 kebab-case（只用 a-z、0-9、-）、不重复（含大小写不敏感、核心包导出名），每个图标都归进了非「未分类」的分类
import { describe, expect, it } from 'vitest'
import { exportName } from '../src/aliases.js'
import { categorize } from '../src/categories.js'
import { files, icons, KEBAB } from './icons.js'

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
