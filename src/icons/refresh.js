import { crisp, rounded } from '../geometry'

// 刷新 ↻：圆心 (12, 12)、半径 8，从正右方顺时针绕到右上 45° 处（315°），
// 再沿 45° 切线直着伸出一小段，末端接一个直角箭头（一条腿竖直向上、一条水平向左），
// 直角的平分线正好是 45° 的前进方向，箭头不会压在弧上
const [cx, cy, r] = [12, 12, 8]
const d = r * Math.SQRT1_2
const [ex, ey] = [cx + d, cy - d] // 315° 处
const [tx, ty] = [ex + 2, ey + 2] // 箭头尖
const s = 4.5

export default ({ radius }) => [
  `M${cx + r} ${cy}A${r} ${r} 0 1 1 ${ex} ${ey}L${tx} ${ty}`,
  rounded([[tx, ty - s], [tx, ty], [tx - s, ty]], crisp(radius), false),
]
