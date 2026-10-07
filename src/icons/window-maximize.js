import { circle, crisp, rounded } from '../geometry'

// 窗口最大化：方框
export default ({ radius, stroke }) => [
  rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]], Math.min(radius, 2)),
]
