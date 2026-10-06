import { circle, crisp, rounded } from '../geometry'

// 求和（Σ）
export default ({ radius, stroke }) => [
  rounded([[17.5, 4.5], [6.5, 4.5], [12.5, 12], [6.5, 19.5], [17.5, 19.5]], Math.min(radius, 1), false),
]
