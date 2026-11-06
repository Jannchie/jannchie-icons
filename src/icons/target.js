import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 目标：三个同心圆
export default ({ radius }) => [
  circle(12, 12, 9),
  circle(12, 12, 5.5),
  circle(12, 12, 2),
]

// 实心：靶面一块，中间那圈和靶心的圆挖成圆环，留下一圈实心环和实心的靶心
export const fill = () => [
  solid(circle(12, 12, 9)),
  knock([circle(12, 12, 5.5), circle(12, 12, 2)]),
]
