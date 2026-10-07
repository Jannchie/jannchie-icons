import { circle, crisp, rounded } from '../geometry'

// 窗口还原：两个交叠的方框（后面的只画露出部分）
export default ({ radius, stroke }) => [
  rounded([[4.5, 8.5], [15.5, 8.5], [15.5, 19.5], [4.5, 19.5]], Math.min(radius, 2)),
  rounded([[8.5, 6], [8.5, 4.5], [19.5, 4.5], [19.5, 15.5], [18, 15.5]], Math.min(radius, 2), false),
]
