import { star } from '../symbols'

// 伊斯兰教：开口朝右的新月 + 开口里一颗五角星
// 新月：大圆减去往右偏的小圆，和 moon 一样两段圆弧围成；尖角受圆角控制
const [c1, r1] = [[10.5, 12], 8.5]
const [c2, r2] = [[14.25, 12], 7]
const d = Math.hypot(c2[0] - c1[0], c2[1] - c1[1])
const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
const h = Math.sqrt(r1 * r1 - a * a)
const [ux, uy] = [(c2[0] - c1[0]) / d, (c2[1] - c1[1]) / d]
const m = [c1[0] + ux * a, c1[1] + uy * a]
const p1 = [m[0] - uy * h, m[1] + ux * h]
const p2 = [m[0] + uy * h, m[1] - ux * h]
const angle = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0])
const onCircle = (c, r, t) => [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]
const pt = p => p.map(v => Math.round(v * 1000) / 1000).join(' ')

function crescent(radius) {
  const fillet = Math.min(radius, 2) * 0.6
  if (!fillet)
    return `M${pt(p1)}A${r1} ${r1} 0 1 1 ${pt(p2)}A${r2} ${r2} 0 0 0 ${pt(p1)}Z`
  const big = [angle(c1, p1) + fillet / r1, angle(c1, p2) - fillet / r1].map(t => onCircle(c1, r1, t))
  const small = [angle(c2, p2) - fillet / r2, angle(c2, p1) + fillet / r2].map(t => onCircle(c2, r2, t))
  return `M${pt(big[0])}A${r1} ${r1} 0 1 1 ${pt(big[1])}Q${pt(p2)} ${pt(small[0])}A${r2} ${r2} 0 0 0 ${pt(small[1])}Q${pt(p1)} ${pt(big[0])}Z`
}

export default ({ radius }) => [
  crescent(radius),
  ...star([16.75, 12], 0.9, radius),
]
