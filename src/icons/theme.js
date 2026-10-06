import { circle } from '../geometry'

// 日夜切换：左上小太阳 / 45° 斜杠 / 右下小月牙
const pt = p => `${p[0]} ${p[1]}`

// 太阳：圆 + 7 道光线（朝斜杠那道去掉，免得顶到斜杠）
const sun = [7.5, 7.5]
const rays = [0, 90, 135, 180, 225, 270, 315].map((deg) => {
  const [c, s] = [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)]
  return `M${sun[0] + 3.75 * c} ${sun[1] + 3.75 * s}L${sun[0] + 5 * c} ${sun[1] + 5 * s}`
})

// 月牙：大圆减去往右上 45° 偏移的小圆
const [c1, r1] = [[16.5, 16.75], 4.25]
const [c2, r2] = [[18.75, 14.5], 3.25]
const d = Math.hypot(c2[0] - c1[0], c2[1] - c1[1])
const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
const h = Math.sqrt(r1 * r1 - a * a)
const [ux, uy] = [(c2[0] - c1[0]) / d, (c2[1] - c1[1]) / d]
const m = [c1[0] + ux * a, c1[1] + uy * a]
const p1 = [m[0] - uy * h, m[1] + ux * h]
const p2 = [m[0] + uy * h, m[1] - ux * h]

export default () => [
  circle(sun[0], sun[1], 2.25),
  ...rays,
  'M19 5L5 19',
  `M${pt(p1)}A${r1} ${r1} 0 1 1 ${pt(p2)}A${r2} ${r2} 0 0 0 ${pt(p1)}Z`,
]
