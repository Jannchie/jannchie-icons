import { circle, crisp, rounded } from '../geometry'

// 窗口还原：两个交叠的方框（后面的只画露出部分）
export default ({ radius, stroke }) => [
  rounded([[4, 8.5], [15.5, 8.5], [15.5, 20], [4, 20]], Math.min(radius, 2)),
  rounded([[8.5, 6], [8.5, 4], [20, 4], [20, 15.5], [18, 15.5]], Math.min(radius, 2), false),
]
