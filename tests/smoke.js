// 渲染冒烟：用公开 API（核心包 index 导出的 toSvg / toPaths，源码入口 src/export.js）把每个图标在一种圆角的全部字重下渲染一遍
// 不抛错；SVG 的 viewBox、宽高、描边属性正确；每条 d、动画的每一帧都是合法的 path 数据（没有 NaN / Infinity）
import { describe, expect, it } from 'vitest'
import { toPaths, toSvg } from '../src/export.js'
import { CORNERS, WEIGHTS } from '../src/options.js'
import { checkPathData, icons } from './icons.js'

// 标签里某个属性的值（属性前面是空格）
function attr(tag, name) {
  const at = tag.indexOf(` ${name}="`)
  if (at < 0)
    return undefined
  const start = at + name.length + 3
  return tag.slice(start, tag.indexOf('"', start))
}

function checkSvg(svg, { stroke, size }) {
  const root = /^<svg\b[^>]*>/.exec(svg)?.[0]
  if (!root)
    return 'no <svg> root'
  if (!svg.trimEnd().endsWith('</svg>'))
    return 'unterminated <svg>'
  if (attr(root, 'viewBox') !== '0 0 24 24')
    return `viewBox is ${attr(root, 'viewBox')}`
  if (attr(root, 'width') !== String(size) || attr(root, 'height') !== String(size))
    return `size is ${attr(root, 'width')}×${attr(root, 'height')}`
  if (attr(root, 'stroke-width') !== String(stroke))
    return `stroke-width is ${attr(root, 'stroke-width')}`
  const paths = [...svg.matchAll(/<path\b[^>]*>/g)].map(m => m[0])
  if (!paths.length)
    return 'no <path>'
  for (const p of paths) {
    const err = checkPathData(attr(p, 'd'))
    if (err)
      return `d: ${err}`
  }
  for (const m of svg.matchAll(/<animate\b[^>]*>/g)) {
    const frames = (attr(m[0], 'values') ?? '').split(';')
    if (frames.length < 2)
      return 'animate without frames'
    for (const f of frames) {
      const err = checkPathData(f)
      if (err)
        return `animate frame: ${err}`
    }
  }
  return null
}

function checkPaths({ svg, paths }, { stroke }) {
  if (svg['stroke-width'] !== stroke)
    return `svg stroke-width is ${svg['stroke-width']}`
  if (!paths.length)
    return 'no paths'
  for (const p of paths) {
    const err = checkPathData(p.d)
    if (err)
      return `d: ${err}`
    for (const f of p.animate ? p.animate.values.split(';') : []) {
      const e = checkPathData(f)
      if (e)
        return `animate frame: ${e}`
    }
  }
  return null
}

// label：CORNERS 里的 label（'sharp'、'0'–'3'）；extra：再测像素对齐（toPaths 的 px）和双色
export function smoke(label, { extra = false } = {}) {
  const corner = CORNERS.find(c => c.label === label)
  const radius = corner.sharp ? 'sharp' : corner.radius
  describe(`render radius ${label}`, () => {
    it('has icons, including animated ones', () => {
      expect(icons.length).toBeGreaterThan(1000)
      expect(icons.some(i => i.animation)).toBe(true)
    })
    for (const weight of WEIGHTS) {
      it(`renders every icon at ${weight.id}`, () => {
        const failures = []
        for (const icon of icons) {
          try {
            const err = checkSvg(toSvg(icon, { radius, weight: weight.id }), { stroke: weight.stroke, size: 24 })
              ?? checkPaths(toPaths(icon, { radius, weight: weight.id }), weight)
              ?? (extra
                ? checkSvg(toSvg(icon, { radius, weight: weight.id, size: 48, duo: true, theme: 'dark' }), { stroke: weight.stroke, size: 48 })
                  ?? checkPaths(toPaths(icon, { radius, weight: weight.id, px: 24 }), weight)
                  ?? checkPaths(toPaths(icon, { radius, weight: weight.id, px: 32, duo: true }), weight)
                : null)
            if (err)
              failures.push(`${icon.name}: ${err}`)
          }
          catch (e) {
            failures.push(`${icon.name}: threw ${e?.stack?.split('\n').slice(0, 3).join(' | ') ?? e}`)
          }
        }
        expect(failures).toEqual([])
      })
    }
  })
}
