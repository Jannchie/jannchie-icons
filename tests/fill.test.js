// 实心变体（fill.js）的接口和快照；逐个圆角的渲染、拟合检查在 tests/fill-*.test.js（按圆角分片并行）
import { describe, expect, it } from 'vitest'
import { toSvg } from '../src/export.js'
import { hasFill } from '../src/render.js'
import { filled } from './fill.js'
import { icons } from './icons.js'
import { expectSnapshot } from './snapshot.js'

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

  // 默认设置（radius 2、regular）的实心 SVG，见 snapshot.js
  it('default fill output matches the snapshot', () => expectSnapshot('fill.json', filled, icon => toSvg(icon, { variant: 'fill' })))
})
