import { circle, crisp, rounded } from '../geometry'

// 窗口最大化：方框
export default ({ radius, stroke }) => [
  rounded([[5, 5], [19, 5], [19, 19], [5, 19]], Math.min(radius, 2)),
]
