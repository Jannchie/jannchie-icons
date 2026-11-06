// 实心变体（fill.js）的渲染检查，按圆角分片（tests/fill-*.test.js），和描边版的 render-*.test.js 一样让 vitest 按文件并行：
// 每个有实心版的图标在这一档圆角的全部字重下都能渲染出合法的实心路径；圆弧、贝塞尔拟合不走样（输出重新打散后和拟合前的多边形几乎重合）
import { describe, expect, it } from 'vitest'
import { toPaths } from '../src/export.js'
import { fitError, solidify } from '../src/fill.js'
import { CORNERS, WEIGHTS } from '../src/options.js'
import { hasFill, setSolidify } from '../src/render.js'
import { checkPathData, icons } from './icons.js'

setSolidify(solidify)
export const filled = icons.filter(hasFill)
// 拟合误差的上限（轮廓平均偏移，网格单位）：两位小数的取整只有千分之几；拟合走样（半圆被放大、控制柄打结）时是百分之一以上
const MAX_FIT_ERROR = 0.01

// label：CORNERS 里的 label（'sharp'、'0'–'3'）
export function fillSmoke(label) {
  const c = CORNERS.find(c => c.label === label)
  const radius = c.sharp ? 'sharp' : c.radius
  describe(`fill radius ${label}`, () => {
    for (const w of WEIGHTS) {
      it(`renders solid paths at ${w.id}`, () => {
        const failures = []
        for (const icon of filled) {
          const { paths } = toPaths(icon, { radius, weight: w.id, variant: 'fill' })
          const bad = !paths.length
            ? 'no paths'
            : paths.map(p => checkPathData(p.d) ?? (p.stroke !== 'none' || !p.fill ? 'not a solid path' : null)).find(Boolean)
          if (bad)
            failures.push(`${icon.name}: ${bad}`)
        }
        expect(failures).toEqual([])
      })
      it(`keeps the fitted arcs and curves on the computed outline at ${w.id}`, () => {
        const failures = []
        for (const icon of filled) {
          const items = icon.fill({ radius: c.radius, stroke: w.stroke, weight: w.id, sharp: !!c.sharp })
          const err = fitError(items, w.stroke, { sharp: !!c.sharp })
          if (err > MAX_FIT_ERROR)
            failures.push(`${icon.name}: ${err.toFixed(4)}`)
        }
        expect(failures).toEqual([])
      })
    }
  })
}
