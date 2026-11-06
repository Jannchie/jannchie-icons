import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 透视：一侧收窄的梯形
export default ({ radius, stroke }) => [
  rounded([[6.5, 4], [17.5, 6.5], [17.5, 17.5], [6.5, 20]], Math.min(radius, 1.5)),
]

// 实心：整个梯形
export const fill = ({ radius }) => [solid(rounded([[6.5, 4], [17.5, 6.5], [17.5, 17.5], [6.5, 20]], Math.min(radius, 1.5)))]
