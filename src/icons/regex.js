import { rounded } from '../geometry'

// 正则表达式：右上一个六芒的星号（中心 (16.5, 8)，臂长 4.5：一竖 + 两道 ±30° 斜线）+ 左下一个方块（「.」，5 × 5，4.5–9.5 × 15.5–20.5）
// 星号的竖画 16.5、方块四边都落在 .5 上
const [cx, cy, a] = [16.5, 8, 4.5]
const dx = +(a * Math.cos(Math.PI / 6)).toFixed(3)
const dy = a / 2

export default ({ radius }) => [
  `M${cx} ${cy - a}V${cy + a}`,
  `M${cx - dx} ${cy - dy}L${cx + dx} ${cy + dy}`,
  `M${cx - dx} ${cy + dy}L${cx + dx} ${cy - dy}`,
  rounded([[4.5, 15.5], [9.5, 15.5], [9.5, 20.5], [4.5, 20.5]], Math.min(radius, 1.5)),
]
