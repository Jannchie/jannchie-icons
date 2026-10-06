import { circle, crisp, rounded } from '../geometry'

// 滤色：三个交叠的圆
export default ({ radius, stroke }) => [
  circle(12, 8.5, 5),
  circle(8.5, 14.5, 5),
  circle(15.5, 14.5, 5),
]
