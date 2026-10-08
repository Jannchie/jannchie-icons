// 别名表（src/aliases.js）校验：现名都存在、旧名不再有文件、没有链式 / 循环别名、导出名不和现有图标撞（validateAliases，构建时同样检查）
import { describe, expect, it } from 'vitest'
import { ALIASES, oldNamesOf, resolveName, validateAliases } from '../src/aliases.js'
import { files, KEBAB } from './icons.js'

describe('aliases', () => {
  const names = files.filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
  const entries = Object.entries(ALIASES)

  it('are valid', () => {
    expect(validateAliases(names)).toEqual([])
  })

  it('old names are kebab-case', () => {
    expect(entries.filter(([old]) => !KEBAB.test(old)).map(([old]) => old)).toEqual([])
  })

  it('resolve both ways', () => {
    for (const [old, name] of entries) {
      expect(resolveName(old)).toBe(name)
      expect(oldNamesOf(name)).toContain(old)
    }
    expect(resolveName('heart')).toBe('heart')
  })
})
