import { circle, rounded } from '../geometry'
import { solid } from '../solid'

// 截图：四角取景框 + 中间一个镜头圆
const r = 3.5 // 角的边长
const corner = ([x, y], dx, dy, radius) => rounded([[x, y + dy * r], [x, y], [x + dx * r, y]], Math.min(radius, 2), false)

export default ({ radius }) => [
  corner([3.5, 3.5], 1, 1, radius),
  corner([20.5, 3.5], -1, 1, radius),
  corner([20.5, 20.5], -1, -1, radius),
  corner([3.5, 20.5], 1, -1, radius),
  circle(12, 12, 3),
]

// 实心：镜头圆填实，四角取景框照旧是线
export const fill = ({ radius }) => [
  corner([3.5, 3.5], 1, 1, radius),
  corner([20.5, 3.5], -1, 1, radius),
  corner([20.5, 20.5], -1, -1, radius),
  corner([3.5, 20.5], 1, -1, radius),
  solid(circle(12, 12, 3)),
]
