import { circle } from '../geometry'

// 目标：三个同心圆
export default ({ radius }) => [
  circle(12, 12, 9),
  circle(12, 12, 5.5),
  circle(12, 12, 2),
]
