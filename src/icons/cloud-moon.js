import { cloud } from '../symbols'

// 云遮月：右上月牙，左下云挡在前面；云的轮廓作为 cut，月牙靠近云的地方断开
const pt = p => `${p[0]} ${p[1]}`
// 月牙：大圆减去往右上 45° 偏移的小圆
const [c1, r1] = [[15.5, 8.5], 4.5]
const [c2, r2] = [[17.75, 6.25], 3.5]
const d = Math.hypot(c2[0] - c1[0], c2[1] - c1[1])
const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
const h = Math.sqrt(r1 * r1 - a * a)
const [ux, uy] = [(c2[0] - c1[0]) / d, (c2[1] - c1[1]) / d]
const m = [c1[0] + ux * a, c1[1] + uy * a]
const p1 = [m[0] - uy * h, m[1] + ux * h]
const p2 = [m[0] + uy * h, m[1] - ux * h]

export default () => [
  `M${pt(p1)}A${r1} ${r1} 0 1 1 ${pt(p2)}A${r2} ${r2} 0 0 0 ${pt(p1)}Z`,
  ...cloud([9.75, 15.5], 2).map(d => ({ d, cut: true })),
]
