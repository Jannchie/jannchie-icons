import { crisp, rounded } from '../geometry'

// Esc ⎋：一个圆，从圆心往左上冲出一支箭头，圆在箭杆穿过的地方断开
// 不用 cut 来断：箭杆要一直画到箭头的尖上，cut 会把箭头尖也一起切掉
const [c, r] = [13, 7]
const open = 18 * Math.PI / 180 // 缺口两侧各让出的角度：断口离箭杆约 2.2
const at = a => [c + r * Math.cos(a), c + r * Math.sin(a)].map(v => Math.round(v * 100) / 100).join(' ')
const up = Math.PI * 5 / 4 // 左上方向

export default ({ radius }) => [
  `M${at(up + open)}A${r} ${r} 0 1 1 ${at(up - open)}`,
  `M${c} ${c}L4.5 4.5`,
  rounded([[4.5, 9.5], [4.5, 4.5], [9.5, 4.5]], crisp(radius), false),
]
