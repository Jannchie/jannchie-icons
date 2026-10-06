import { crisp, rounded } from '../geometry'

// 历史：起点在左上、顺时针绕 320° 的表盘弧（开口在左边），起点处一个逆时针方向的 45° 箭头 + 指针
const [cx, cy, r] = [12.5, 12, 8]
const rad = deg => deg * Math.PI / 180
const at = deg => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]
const [from, to] = [200, 160 + 360]
const start = at(from)
// 逆时针（角度减小）的切线方向；箭翼沿切线往回 45°
const t = [Math.sin(rad(from)), -Math.cos(rad(from))]
const n = [-t[1], t[0]]
const s = 2.75
const wing = k => [start[0] - (t[0] - k * n[0]) * s, start[1] - (t[1] - k * n[1]) * s]

export default ({ radius }) => [
  `M${start.join(' ')}A${r} ${r} 0 1 1 ${at(to).join(' ')}`,
  rounded([wing(1), start, wing(-1)], crisp(radius), false),
  `M${cx} 7.5V12L${cx + 3} 14`,
]
