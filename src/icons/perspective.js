import { circle, crisp, rounded } from '../geometry'

// 透视：一侧收窄的梯形
export default ({ radius, stroke }) => [
  rounded([[6.5, 4], [17.5, 6.5], [17.5, 17.5], [6.5, 20]], Math.min(radius, 1.5)),
]
