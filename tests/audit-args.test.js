// 审计脚本的命令行（scripts/audit-baseline.mjs 的 parseArgs）：名字前缀不能被当成基线文件名
import { describe, expect, it } from 'vitest'
import { parseArgs } from '../scripts/audit-baseline.mjs'

const DEFAULT = 'scripts/audit-grid.baseline.json'

describe('audit arguments', () => {
  it('treats a name after --update-baseline as a prefix, not a file', () => {
    expect(parseArgs(['--update-baseline', 'folder'], 'grid')).toMatchObject({ prefixes: ['folder'], baseline: DEFAULT, update: true })
    expect(parseArgs(['folder', '--update-baseline'], 'grid')).toMatchObject({ prefixes: ['folder'], baseline: DEFAULT, update: true })
  })
  it('takes a baseline file only with =', () => {
    expect(parseArgs(['--baseline=tmp/x.json'], 'grid')).toMatchObject({ baseline: 'tmp/x.json', update: false })
  })
  it('reads --max in both forms and rejects unknown options', () => {
    expect(parseArgs(['--max', '3', 'file'], 'grid')).toMatchObject({ max: 3, prefixes: ['file'] })
    expect(parseArgs(['--max=0'], 'grid')).toMatchObject({ max: 0 })
    expect(() => parseArgs(['--nope'], 'grid')).toThrow('unknown option')
  })
})
