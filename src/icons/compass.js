import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 指南针：圆 + 菱形指针
export default ({ radius }) => [
  circle(12, 12, 9),
  rounded([[15.5, 8.5], [13.5, 13.5], [8.5, 15.5], [10.5, 10.5]], Math.min(radius, 0.75)),
]

// 实心：表盘一块，指针的菱形轮廓挖空，指针留成实心
export const fill = ({ radius }) => [
  solid(circle(12, 12, 9)),
  knock(rounded([[15.5, 8.5], [13.5, 13.5], [8.5, 15.5], [10.5, 10.5]], Math.min(radius, 0.75))),
]
