import { circle, crisp, rounded } from '../geometry'

// 透视：一侧收窄的梯形
export default ({ radius, stroke }) => [
  rounded([[6, 4], [18, 6.5], [18, 17.5], [6, 20]], Math.min(radius, 1.5)),
]
