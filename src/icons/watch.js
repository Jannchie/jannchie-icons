import { circle, crisp, rounded } from '../geometry'

// 手表：表盘（圆心 (12, 12)、半径 6）+ 上下两段表带（宽 6，9–15，从表盘边竖直伸出到 3.5 / 20.5）+ 时针分针
// 表带两边正好在 x = 9 / 15 处接上表盘（离圆心 3，接点 y = 12 ∓ √27）
const [cx, cy, R] = [12, 12, 6]
const h = +Math.sqrt(R * R - 9).toFixed(3)

export default ({ radius }) => [
  circle(cx, cy, R),
  rounded([[9, cy - h], [9, 3.5], [15, 3.5], [15, cy - h]], crisp(radius), false),
  rounded([[9, cy + h], [9, 20.5], [15, 20.5], [15, cy + h]], crisp(radius), false),
  rounded([[cx, 9], [cx, cy], [14, 13.5]], crisp(radius), false),
]
