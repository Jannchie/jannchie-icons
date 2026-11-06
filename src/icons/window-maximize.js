import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 窗口最大化：方框
export default ({ radius, stroke }) => [
  rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]], Math.min(radius, 2)),
]

// 实心：整个方框
export const fill = ({ radius }) => [solid(rounded([[5.5, 5.5], [18.5, 5.5], [18.5, 18.5], [5.5, 18.5]], Math.min(radius, 2)))]
